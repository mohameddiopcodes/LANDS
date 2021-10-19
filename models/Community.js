const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    },
    image: String,
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    comments: [this]
}, {
    timestamps: true
})

const communitySchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    image: Buffer,
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    activities: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Activity'
    },
    posts: [postSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Community', communitySchema)