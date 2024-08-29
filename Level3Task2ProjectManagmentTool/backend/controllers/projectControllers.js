const asyncHandler = require('express-async-handler')
const Project = require('../models/project')
const { STATUSCODE } = require('../constants/statuscode')

const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    deadline,
    priority,
    userList,
    status = 0
  } = req.body
  const userId = req.user.id
  const project = await Project.create({
    creatorId: userId,
    title,
    description,
    priority,
    deadline,
    userList,
    status
  })
  return res.status(STATUSCODE.CREATED).json(project)
})

module.exports = { createProject }
