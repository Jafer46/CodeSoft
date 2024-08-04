const express = require('express');
const dotenv = require('dotenv').config();
const dbconnect = require('./config/dbConnection');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');


//intializing our databases connecton
//you can see the config file for more info
dbconnect()


const port = process.env.PORT || 5000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
//app.use(session());

app.get('/',(req, res) => {
    res.render('index')
})

app.get('/login',(req, res) => {
    res.render('login')
})

app.get('/signup',(req, res) => {
    res.render('signup')
})

app.listen(port, ()=> {
    console.log(`app listening at ${port}`)
})