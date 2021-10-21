const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Community = require('./Community')
const Activity = require('./Activity')

const userSchema = new mongoose.Schema({
    name: String,
    googleId: String,
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    dateOfBirth: Date,
    avatar: Buffer,
    password: String,
    communities: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Community'
    },
    activities: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Activity'
    },
    location: {
        address: String,
        city: String,
        state: String,
    },
    phoneNumber: String,
    avatar: Buffer
}, {
    timestamps: true
})

//Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    if(this.password) {
        this.dateOfBirth = new Date(this.dateOfBirth)
        this.password = await bcrypt.hash(this.password, process.env.SECRET)
    }
    next()
})

//Cascade delete
userSchema.pre('remove', async function(next) {
    try {
        await Activity.remove({ 'origin.user': this._id })
        await Community.remove({creator: this._id})
        await Community.updateMany(
            {creator: this._id},
            {'$pull': { posts: { from: this._id } } }
        )
        next()
    } catch(error) {
        console.log(error)
        next()
    }
})

//create model method
userSchema.statics.logIn = async function (email, password) {
    const user = await this.findOne({ email })
    if(!user) return false
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return false
    return user
}

module.exports = mongoose.model('User', userSchema)