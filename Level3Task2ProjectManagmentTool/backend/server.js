const express = require('express')
const errorHandler = require('./middlewares/errorHandling')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const dbConnection = require('./config/dbConnection')

dbConnection()
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
//app.use('/', './routes/routes.js')
//app.use(cors)
app.use(errorHandler)

app.listen(() => {
  console.log(`listening to port ${port}`)
})
