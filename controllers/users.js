module.exports = {
    create,
    edit,
    update,
    delete: deleteUser,
    upload,
    avatar
}

const User = require('../models/User')

const sharp = require('sharp')
const moment = require('moment')
const bcrypt = require('bcryptjs')

async function create(req, res) {
    try {
        const user = new User(req.body)
        await user.save()
        res.redirect('/')
    } catch(error) {
        console.log(error)
        res.redirect(`/signup?error=${error.message}`)
    }
}

async function edit(req, res) {
    const user = await User.findById(req.params.id)
    res.render('users/edit', { moment })
}

async function update(req, res) {
    req.body.dateOfBirth = new Date(req.body.dateOfBirth)
    req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SECRET))
    req.body.location = {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
    }
    delete req.body.address
    delete req.body.city
    delete req.body.state
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
        if(err) console.log(err)
    })
    res.redirect(`/`)
}

async function deleteUser(req, res) {
    try {
        const user = await User.findById(req.params.id)
        await user.remove()
        res.redirect(`/signup`)
    } catch(error) {
        res.redirect(`users/${req.params.id}/edit`)
    }
}

async function upload(req, res) {
    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        req.user.avatar = buffer
        await req.user.save()
        res.redirect('/')
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
}

async function avatar(req, res) {
    res.render('users/avatar')
}