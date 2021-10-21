module.exports = belongsToUser

const Community = require('../models/Community')
const Activity = require('../models/Community')

async function belongsToUser(req, res, next) {
    const community = await Community.findById(req.params.id)
    const activity = await Activity.findById(req.params.id)
    let post = await Community.findOne({ 'posts.id': req.params.id })
    if(post.posts) {
        post = post.posts.find(p => p._id === req.params.id )
    }
    if(req.user._id !== community.creator || req.user._id !== activity.origin.user || req.user._id !== post.from) {
        res.redirect('/login')
    }
    res.locals.user = req.user
    next()
}