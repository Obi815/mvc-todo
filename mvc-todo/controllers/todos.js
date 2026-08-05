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
}