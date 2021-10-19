module.exports = {
    create,
    show,
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
    const post = community.find(p => p._id === req.params.id )
    res.render('posts/show', { post })
}

async function update(req, res) {
    const community = await Community.findOne({'posts._id': req.params.id})
    const postId = community.findIndex(p => p._id === req.params.id )
    community.splice(postId, postId+1, req.body)
    await community.save()
    res.redirect(`/communities/${community._id}`)
}

async function deletePost(req, res) {
    const community = await Community.findOne({'posts._id': req.params.id})
    const postId = community.findIndex(p => p._id === req.params.id )
    community.splice(postId, postId+1)
    await community.save()
    res.redirect(`/communities/${community._id}`)
}