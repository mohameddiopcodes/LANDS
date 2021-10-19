const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: String,
    googleId: String,
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if(!validator.isEmail(value)) {
            throw new Error('Email is not valid')
          }
        }
    },
    dateOfBirth: Date,
    avatar: Buffer,
    password: String,
    communities: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Community'
    },
    activities: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Activity'
    },
    location: {
        address: String,
        city: String,
        state: String,
    },
    phoneNumber: String,
    avatar: Buffer
}, {
    timestamps: true
})

//Hash the plain text password without saving
userSchema.pre('save', async function(next) {
    const user = this
    user.dateOfBirth = new Date(user.dateOfBirth)
    user.password = await bcrypt.hash(user.password, 8)
    next()
})

//create model method
userSchema.statics.logIn = async function (email, password) {
    const user = await this.findOne({ email })
    if(!user) return false
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return false
    return user
}

module.exports = mongoose.model('User', userSchema)