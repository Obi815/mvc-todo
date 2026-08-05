const express = require('express')
const router = express.Router()
const controller = require('../controllers/todos')

router.get('/', controller.getTodos)

module.exports = router