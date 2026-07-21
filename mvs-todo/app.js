const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mvc-todo')
app.set('view engine','ejs')

app.get('/', (req, res) => {
    res.render("index.ejs")
})
app.listen(3000, () =>{
    console.log("Server is Running");
    
})