const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    user: {type: String},
    todo: {type: String},
    completed: {type: Boolean}, 
})

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, }
})

module.exports = mongoose.model('Todo', TodoSchema)