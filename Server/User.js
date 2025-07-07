const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
})

const userModel = mongoose.model('users', UserSchema)

module.exports = userModel