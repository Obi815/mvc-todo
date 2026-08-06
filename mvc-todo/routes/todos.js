const express = require('express')
const router = express.Router()
const controller = require('../controllers/todos')

router.get('/', controller.getTodos)
router.post('/createTodos', controller.createTodo)
router.delete('/deleteTodo', controller.deleteTodo)
module.exports = router