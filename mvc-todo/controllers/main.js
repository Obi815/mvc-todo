const User = require('../models/User')

module.exports = {
    getLogin: (req, res) => {
        res.render('login.ejs')
    },
    getSignup: (req, res) => {
        res.render('signup.ejs')
    },
    logout: (req, res) => {
        req.logout(() => {
            console.log('User has logged out.')
        })
        req.session.destroy((err) => {
            if (err) console.log('Error: Failed to destroy the session durring logout.', err)
            req.user = null
            res.redirect('/')
        })
    }
}