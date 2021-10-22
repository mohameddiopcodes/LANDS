module.exports = {
    new: newActivity,
    create,
    show,
    edit,
    update,
    delete: deleteActivity,
    join: joinActivity
}

const Community = require('../models/Community')
const Activity = require('../models/Activity')

const moment = require('moment')

async function newActivity(req, res) {
    res.render('activities/new', {communityId: req.params.id})
}

async function create(req, res) {
    try {
        req.body.origin = {
            community: req.params.id,
            user: req.user._id
        }
        req.body.location = {
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
        }
        delete req.body.address
        delete req.body.city
        delete req.body.state
        const activity = new Activity(req.body)
        const community = await Community.findById(req.params.id)
        activity.communities.push(community._id)
        await activity.save()

        req.user.activities.push(activity._id)
        await req.user.save()

        community.activities.push(activity._id)
        community.posts.push({
            from: activity.origin.user,
            content: activity.description,
            activity: activity._id
        })       
        await community.save()
        res.redirect(`/communities/${req.params.id}`)
    } catch(error) {
        console.log(error)
        res.redirect(`/communities/${req.params.id}`)
    }
}

async function show(req, res) {
    const activity = await Activity.findById(req.params.id)
    res.render('activities/show', { activity })
}

async function edit(req, res) {
    try {
        const activity = await Activity.findById(req.params.id)
        res.render('activities/edit', { activity, moment })
    } catch(error) {
        console.log(error)
        res.redirect(`/activities/${req.params.id}`)
    }
}

async function update(req, res) {
    req.body.origin = {
        community: req.params.id,
        user: req.user._id
    }
    req.body.location = {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
    }
    delete req.body.address
    delete req.body.city
    delete req.body.state
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body)
    const community = await Community.findOne({'posts.activity': activity._id})
    const postId = community.posts.findIndex(p => Object.is(p.activity, activity._id))
    community.posts[postId] = {
            from: req.user,
            content: req.body.description,
            activity: req.params.id
        }
    community.save()
    res.redirect(`/activities/${req.params.id}`)
}

async function deleteActivity(req, res) {
    try {
        const activity = await Activity.findById(req.params.id)
        await activity.remove()
        const community = await Community.findOne({'posts.activity': activity._id})
        console.log(p.activity)
        const postId = community.posts.findIndex(p => p.activity.toString() === activity._id.toString())
        community.posts.splice(postId, postId+1)
        community.save()
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