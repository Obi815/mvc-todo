const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/todos')

app.use(express.static('public'))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mvc-todo')
app.set('view engine','ejs')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render("index.ejs")
})
app.use('/todos', routes)

app.listen(3000, () =>{
    console.log("Server is Running");
    
})