const mongoose = require('mongoose')

const User = require('./User')
const Community = require('./Community')

const activitySchema = new mongoose.Schema({
    name: String,
    images: [Buffer],
    date: Date,
    place: {
        address: String,
        city: String,
        state: String,
    },
    description: String,
    participating: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    communities: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Community'
    },
    origin: {
        community: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Activity', activitySchema)