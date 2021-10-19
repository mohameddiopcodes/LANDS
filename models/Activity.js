const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    name: String,
    images: [String],
    date: Date,
    place: String,
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