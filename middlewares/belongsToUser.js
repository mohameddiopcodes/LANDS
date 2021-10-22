module.exports = belongsToUser

const Community = require('../models/Community')
const Activity = require('../models/Community')

async function belongsToUser(req, res, next) {

    const community = await Community.findById(req.params.id)
    if(community && req.user._id.toString() !== community.creator.toString()) {
        res.redirect(`/communities/${community._id}`)
    }
    const activity = await Activity.findById(req.params.id)
    if(activity && req.user._id.toString() !== activity.origin.user.toString()) {
        res.redirect(`/activities/${activity._id}`)
    }
    const c = await Community.findOne({ 'posts.id': req.params.id })
    let post;
    post = c && c.posts? c.posts.find(p => p._id.toString() === req.params.id ):false
    if(req.user && post && req.user._id.toString() !== post.from.toString()) {
        res.redirect(`/communities/${c._id}`)
    }
    next()
}