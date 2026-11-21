const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req, res) => {
        try {
            const todoItems = await Todo.find({user: req.user.id})
            res.render('todos.ejs', { todos:todoItems })
        } catch (err) {
            console.log(err)
        }
    },
    createTodo: async(req, res) => {
        try {
            await Todo.create({ 
                todo: req.body.userTodo, 
                user: req.user.id })
            res.redirect('/todos')
        } catch (err) {
            console.log(err)
        }
    },
    deleteTodo: async(req, res) => {
        try {
            await Todo.findOneAndDelete({
                _id: req.body.todoIdFromJSFile,
                user: req.user.id //deleting specific user todos
            })
            res.json('Deleted It')
        } catch (err) {
            console.log(err)
        }
    },
    markComplete: async(req, res) => {
        try {
            await Todo.findOneAndUpdate({
                _id: req.body.todoIdFromJSFile, 
                user: req.user.id
            },
            { completed: true },)
            res.json('Marked Complete')
        } catch (err) {
            console.log(err)
        }
    },
    markIncomplete: async(req, res) => {
        try {
            await Todo.findOneAndUpdate({
                _id: req.body.todoIdFromJSFile, 
                user: req.user.id
            },
            { completed: false },)
            res.json('Marked Incomplete')
        } catch (err) {
            console.log(err)
        }
    },
}