const express = require('express')
const router = express.Router()
const controller = require('../controllers/todos')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, controller.getTodos)
router.post('/createTodos', controller.createTodo)
router.delete('/deleteTodo', controller.deleteTodo)
router.put('/markComplete', controller.markComplete)
router.put('/markIncomplete', controller.markIncomplete)
module.exports = router

