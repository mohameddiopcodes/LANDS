module.exports = {
    create,
    show,
    update,
    delete: deleteActivity,
    join: joinActivity
}

const Community = require('../models/Community')
const Activity = require('../models/Activity')

async function create(req, res) {
    try {
        req.body.origin = {
            community: req.params.id,
            user: req.user._id
        }
        const activity = new Activity(req.body)
        const community = await Community.findById(req.params.id)
        activity.communities.push(community._id)
        await activity.save()

        req.user.activities.push(activity._id)
        await req.user.save()

        community.activities.push(activity._id)       
        await community.save()

        res.redirect(`/communities/${req.params.id}`)
    } catch(error) {
        res.redirect(`/communities/${req.params.id}`)
    }
}

async function show(req, res) {
    const activity = await Activity.findById(req.params.id)
    res.render('activities/show', { activity })
}

async function update(req, res) {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/communities/${activity.origin.community}`)
}

async function deleteActivity(req, res) {
    try {
        const activity = await Activity.findById(req.params.id)
        await activity.remove()
        res.redirect(`/communities/${activity.origin.community}`)
    } catch(error) {
        res.redirect(`/activities/${req.params.id}`)
    }
}

async function joinActivity(req, res) {
    const activity = await Activity.findById(req.params.id)
    activity.participating.push(req.user._id)
    await activity.save()

    req.user.activities.push(activity._id)
    await participant.save()


    res.redirect(`/communities/${activity.origin.community}`)
}