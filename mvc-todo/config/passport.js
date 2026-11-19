const User = require('../models/User')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy( { usernameField: 'email'},
  async function(email, password, done) {
    try {
      const user = await User.findOne({ email: email })
      if(!user) { return done(null, false) }
      const isMatch = await user.comparePassword(password)
      if(!isMatch) { return done(null, false) }
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})