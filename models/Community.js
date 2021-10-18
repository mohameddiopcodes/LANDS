const mongoose = require('mongoose')

const communitySchema = new mongoose.Schema({
    name: String,
    image: String,
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Community', communitySchema)