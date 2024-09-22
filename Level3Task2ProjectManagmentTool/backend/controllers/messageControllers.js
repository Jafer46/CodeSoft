const asyncHandler = require('express-async-handler')
const Message = require('../models/message')
const { STATUSCODE } = require('../constants/statuscode')

const sendMessage = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { projectId, content } = req.body

  if (!projectId || !content) {
    res.status(STATUSCODE.VALIDATION_ERROR)
    throw new Error('Mandatory field are not field!')
  }

  return res.status(STATUSCODE.CREATED).json(message)
})
