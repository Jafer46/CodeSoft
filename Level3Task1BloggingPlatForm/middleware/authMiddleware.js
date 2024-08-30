const asyncHandler = require('express-async-handler')
const { MESSAGETYPE } = require('../constants/messageConstant')

const authenticate = asyncHandler(async (req, res, next) => {
  if (!req.session.isAuth && !req.session.user) {
    return res.redirect('/login')
  }
  next()
})

module.exports = authenticate
