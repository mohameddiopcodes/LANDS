module.exports = {
    create,
    show,
    edit,
    update,
    delete: deletePost
}

const Community = require('../models/Community')

async function create(req, res) {
    try {
        const community = await Community.findById(req.params.id)
        req.body.from = req.user._id
        community.posts.push(req.body)
        await community.save()
        res.redirect(`/communities/${req.params.id}`)
    } catch(error) {
        res.redirect(`/communities/${req.params.id}`)
    }
}

async function show(req, res) {
    const community = await Community.findOne({'posts._id': req.params.id})
    const post = community.posts.find(p => p._id.toString() === req.params.id )
    res.render('posts/show', { post })
}

async function edit(req, res) {
    try {
        const community = await Community.findOne({'posts._id': req.params.id})
        const post = community ? community.posts.find(p => p._id.toString() === req.params.id ):{}
        res.render('posts/edit', { post, communityId: community._id })
    } catch(error) {
        console.log(error)
        res.redirect('/communities')
    }
}

async function update(req, res) {
    try {
        req.body.from = req.user
        const community = await Community.findOne({'posts._id': req.params.id})
        let postId = community.posts.findIndex(p => p._id.toString() === req.params.id )
        community.posts.splice(postId, postId+1, req.body)
        await community.save()
        res.redirect(`/communities/${community._id}`)
    } catch(error) {
        console.log(error)
        res.redirect(`/posts/${req.params.id}/edit`)
    } 
}

async function deletePost(req, res) {
    try {
        const community = await Community.findOne({'posts._id': req.params.id})
        let postId = community.posts.findIndex(p => p._id.toString() === req.params.id )
        community.posts.splice(postId, postId+1)
        await community.save()
        res.redirect(`/communities/${community._id}`)
    } catch(error) {
        console.log(error)
        res.redirect(`/posts/${req.params.id}/edit`)
    } 
}