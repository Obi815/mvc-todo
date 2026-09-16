const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userEmail: {type: String},
    userPassword: {type: String},
})

module.exports = mongoose.model('User', UserSchema)