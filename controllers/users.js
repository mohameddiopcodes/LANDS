module.exports = {
    create,
    edit,
    update,
    delete: deleteUser
}

const User = require('../models/User')

async function create(req, res) {
    try {
        req.body.avatar = Buffer.from(req.files.avatar)
        const user = new User(req.body)
        await user.save()
        res.redirect('/')
    } catch(error) {
        res.redirect('/signup')
    }
}

async function edit(req, res) {
    const user = await User.findById(req.params.id)
    res.render('users/edit', user)
}

async function update(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        user.save()
    } catch(error) {
        res.redirect(`users/${req.params.id}/edit`)
    }
}

async function deleteUser(req, res) {
    try {
        await User.findByIdAndDelete(req.params.id)
    } catch(error) {
        res.redirect(`users/${req.params.id}/edit`)
    }
}