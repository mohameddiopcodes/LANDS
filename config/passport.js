const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../models/User')

const dev = "http://localhost:3000/auth/google/callback"
const prod = "https://lands-connect.herokuapp.com/auth/google/callback"

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: dev
    },
    async function(accessToken, refreshToken, profile, next) {
        //use profile info to check for user in db or create
        try {
            let user = await User.findOne({googleId: profile.id})
            if(user) return next(null, user)
            user = new User({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            })
            await user.save()
            next(null, user)
        } catch(e) {
            next(e)
        }
    })
)

passport.serializeUser(function(user, next) {
    next(null, user._id)
})

passport.deserializeUser(function(id, next) {
    User.findById(id, function(e, user) {
        if(e) next(e)
        next(null, user)
    })
})