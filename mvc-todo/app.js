require('dotenv').config()
require('./config/passport')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/todos')
const passport = require('passport')
const session = require('express-session')

app.use(express.static('public'))
app.use(express.json())

mongoose.connect(process.env.DB_STRING)
app.set('view engine','ejs')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render("index.ejs")
})

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use('/todos', routes)


app.listen(process.env.PORT, () => {
    console.log('Server is Running')
})
