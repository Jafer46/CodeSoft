const asyncHandler = require('express-async-handler')
const { MESSAGETYPE } = require('../constants/messageConstant')

const authenticate = asyncHandler(async (req, res, next) => {
  console.log(req.session.user)
  next()
})

module.exports = authenticate
