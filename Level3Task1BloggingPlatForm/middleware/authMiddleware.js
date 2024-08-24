const asyncHandler = require('express-async-handler')
const { MESSAGETYPE } = require('../constants/messageConstant')

const authenticate = asyncHandler(async (req, res, next) => {
  if (!req.session.isAuth && !req.session.user) {
    req.flash('message', { message: 'login required', type: MESSAGETYPE.ERROR })
    return
  }
  next()
})

module.exports = authenticate
