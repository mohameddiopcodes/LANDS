module.exports = {
    index,
    new: newCommunity,
    create,
    show,
    edit,
    update,
    delete: deleteCommunity,
    join: joinCommunity
}

const Community = require('../models/Community')
const User = require('../models/User')

async function index(req, res) {
    const communities = await Community.find()
    res.render('communities/index', { communities })
}

async function newCommunity(req, res) {
    res.render('communities/new')
}

async function create(req, res) {
    try {
        req.body.image = Buffer.from(req.files.image)
        req.body.creator = req.user._id
        const community = new Community(req.body)
        await community.save()
        res.redirect('/communities')
    } catch(error) {
        res.redirect('/communities/new')
    }
}

async function show(req, res) {
    try {
        const community = await Community.findById(req.params.id)
        res.render('communities/show', { community })
    } catch(e) {
        res.redirect('/communities')
    }
}

async function edit(req, res) {
    res.render('communities/edit')
}

async function update(req, res) {
    try {
        req.body.image = Buffer.from(req.files.image)
        const community = await Community.findByIdAndUpdate(req.params.id, req.body)
        await community.save()
        res.redirect(`/communities/${req.params.id}`)
    } catch(error) {
        res.redirect(`/communities/edit/${req.params.id}`)
    }
}

async function deleteCommunity(req, res) {
    try {
        const community = await Community.findByIdAndDelete(req.params.id)
        await community.save()
        res.redirect(`/communities`)
    } catch(error) {
        res.redirect(`/communities/edit/${req.params.id}`)
    }
}

async function joinCommunity(req, res) {
    const community = await Community.findById(req.params.id)
    community.users.push(req.user._id)
    community.save()

    const user = User.findById(req.user._id)
    user.communities.push(community._id)
    user.save()
    
    res.redirect(`/communities/${req.params.id}`)
}