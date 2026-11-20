const User = require('../models/User')
const passport = require('passport')

module.exports = {
    getLogin: (req, res) => {
        res.render('login.ejs')
    },
    getSignup: (req, res) => {
        res.render('signup.ejs')
    },
    logout: (req, res, next) => {
        console.log('logout route hit')
        req.logout((err) => {
            if (err) { return next(err) }
            req.session.destroy((err) => {
                if (err) console.log('Error: Failed to destroy the session during logout.', err)
                res.redirect('/')
            })
        })
    },
    postSignup: async (req, res, next) => {
        try {
            const user = new User({
                email: req.body.email,
                password: req.body.password
            })
            await user.save()
            req.logIn(user, (err) =>{
                if (err) { return next(err) }
                res.redirect('/todos')
            })
        } catch (err) {
            return next(err)
        }
    },
    postLogin: (req, res, next) => {
        passport.authenticate('local', (err, user) => {
            if (err) { return next(err) }
            if (!user) { return res.redirect('/login') }
            req.logIn(user, (err) => {
                if (err) { return next(err) }
                res.redirect('/todos')
            })
        })(req, res, next) 
    }
}