module.exports = {
    index,
    new: newCommunity,
    create,
    show,
    edit,
    update,
    delete: deleteCommunity,
    join: joinCommunity,
    upload
}

const Community = require('../models/Community')

const moment = require('moment')
const sharp = require('sharp')

async function index(req, res) {
    const communities = await Community.find().limit(12)
    res.render('communities/index', { communities })
}

async function newCommunity(req, res) {
    res.render('communities/new')
}

async function create(req, res) {
    try {
        req.body.creator = req.user._id
        const community = new Community(req.body)
        await community.save()
        res.redirect('/communities')
    } catch(error) {
        console.log(error)
        res.redirect('/communities/new')
    }
}

function show(req, res) {
        Community   
            .findById(req.params.id)
            .populate('posts.from')
            .exec((error, community) => {
                if(error) {
                    console.log(error)
                    res.redirect('/communities')
                }
                community.posts && community.posts.sort()
                res.render('communities/show', { community, moment })
            })
}

async function edit(req, res) {
    const community = await Community.findById(req.params.id)
    res.render('communities/edit', { community })
}

async function update(req, res) {
    try {
        await Community.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/communities/${req.params.id}`)
    } catch(error) {
        console.log(error)
        res.redirect(`/communities/${req.params.id}/edit`)
    }
}

async function deleteCommunity(req, res) {
    try {
        const community = await Community.findById(req.params.id)
        await community.remove()
        res.redirect(`/communities`)
    } catch(error) {
        res.redirect(`/communities/${req.params.id}/edit`)
    }
}

async function joinCommunity(req, res) {
    const community = await Community.findById(req.params.id)
    community.users.push(req.user._id)
    community.save()

    req.user.communities.push(community._id)
    req.user.save()
    
    res.redirect(`/communities/${req.params.id}`)
}

async function upload(req, res) {
    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        const community = await Community.findById(req.params.id)
        community.image = buffer
        await community.save()
        res.redirect('/communities')
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
}