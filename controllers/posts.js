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
    const post = community.posts.find(p => p._id === req.params.id )
    res.render('posts/show', { post })
}

function update(req, res) {
    req.body._id = req.params.id
    Community.updateOne(
        { 'posts.id': req.params.id },
        {'$set': {'posts.$': req.body} },
        function(error, community) {
            if(error) res.redirect(`/posts/${req.params.id}`)
            res.redirect(`/communities/${community._id}`)
        }
    )
    
}

function deletePost(req, res) {
    Community.updateOne(
        { 'posts.id': req.params.id },
        { '$pull': { 'posts.id': { '$in': req.params.id } } },
        function(error, community) {
            if(error) res.redirect(`/posts/${req.params.id}`)
            res.redirect(`/communities/${community._id}`)
        }
    )
}