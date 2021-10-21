const mongoose = require('mongoose')

const User = require('./User')
const Community = require('./Community')

const activitySchema = new mongoose.Schema({
    name: String,
    images: [Buffer],
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

activitySchema.pre('remove', async function(next) {
    try {
        await User.updateMany(
            {activities: {'$in': this._id}},
            { '$pull': { activities: { '$in': [this._id] }  } }
        )
        await Community.updateMany(
            {activities: {'$in': this._id}},
            { '$pull': { activities: { '$in': [this._id] } } }
        )
        await Community.updateMany(
            {activities: {'$in': this._id}},
            { '$pull': { posts: { activity: this._id } } }
        )
        next()
    } catch(error) {
        console.log(error)
        next()
    }
})

module.exports = mongoose.model('Activity', activitySchema)