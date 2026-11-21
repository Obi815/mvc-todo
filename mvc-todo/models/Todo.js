const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    user: {type: String, required: true},
    todo: {type: String},
    completed: {type: Boolean}, 
})


module.exports = mongoose.model('Todo', TodoSchema)