const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req, res) => {
        try {
            const todoItems = await Todo.find()
            res.render('todos.ejs', { todos:todoItems })
        } catch (err) {
            console.log(err)
        }
    },
    createTodo: async(req, res) => {
        try {
            const makeTodo = await Todo.create({ todo: req.body.userTodo })
            res.redirect('/todos')
        } catch (err) {
            console.log(err)
        }
    },
    deleteTodo: async(req, res) => {
        try {
            const deleteTodo = await Todo.findByIdAndDelete(req.body.todoIdFromJSFile)
            res.json('Deleted It')
        } catch (err) {
            console.log(err)
        }
    },
}