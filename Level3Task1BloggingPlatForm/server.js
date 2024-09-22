const express = require('express')
const dotenv = require('dotenv').config()
const dbconnect = require('./config/dbConnection')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const authenticate = require('./middleware/authMiddleware')
const mongoStore = require('connect-mongo')
const flash = require('connect-flash')

//intializing our databases connecton
//you can see the config file for more info
dbconnect()

//app ans port initializations
const port = process.env.PORT || 5000
const app = express()

//setting up ejs
app.set('view engine', 'ejs')

//setting up middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSION_SECERETE,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: process.env.CONNECTION_STRING, // Database connection string
      collectionName: 'sessions', // Optional: specify your sessions collection
      ttl: 14 * 24 * 60 * 60 // Session expiration in seconds (optional)
    })
  })
)
app.use(flash())
app.use('/api', require('./routes/apiRoutes'))
app.use('/', require('./routes/pagesRoutes'))

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/blog/create', (req, res) => {
  res.render('createBlog', { title: 'create blog', user: null })
})

app.listen(port, () => {
  console.log(`app listening at ${port}`)
})
