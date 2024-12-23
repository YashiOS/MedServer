const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const { token } = require('morgan')
const { required } = require('@hapi/joi')
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
})

UserSchema.pre('save', async function (next) {
try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
} catch (error) {
next(error)
}
})

UserSchema.methods.isValidPassword = async function (password) {
try {
    return await bcrypt.compare(password, this.password) 
} catch (error) {
throw error
}
}

UserSchema.post('save', async function (next) {
    try {
        console.log("Called after saving the user")
    } catch (error) {
    next(error)
    }
    })

const User = mongoose.model('user', UserSchema)
module.exports = User

