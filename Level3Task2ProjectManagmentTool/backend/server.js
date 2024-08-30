const express = require('express')
const dotenv = require('dotenv').config()
const dbconnection = require('./config/dbConnection')
const bodyParser = require('body-parser')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandling')
const { STATUSCODE } = require('./constants/statuscode')

dbconnection()
const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/api', require('./routes/routes'))
app.use(errorHandler)
app.listen(port, () => {
  console.log(`server listening to port ${port}`)
})
