const express = require('express')
const router = express.Router()
const mainController = require('../controllers/main')

router.get('/login', mainController.getLogin)
router.post('/login', mainController.postLogin)
router.get('/logout', mainController.logout)
router.get('/signup', mainController.getSignup)
router.post('/signup', mainController.postSignup)

module.exports = router