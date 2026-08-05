const express = require('express')
const router = express.Router()
const controller = require('../controllers/todos')

router.get('/', controller.getTodos)
router.post('/createTodos', controller.createTodo)
module.exports = router