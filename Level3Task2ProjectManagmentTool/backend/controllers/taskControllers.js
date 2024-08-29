const asyncHandler = require('express-async-handler')
const Task = require('../models/tasks')

const createTask = asyncHandler(async (req, res) => {
  const createdBy = req.user.id
  const { title, description, partOf, status = 0, assignedUsers } = req.body
  const task = await Task.create({
    title,
    description,
    partOf,
    createdBy,
    status,
    assignedUsers
  })
  return res.status(200).json(task)
})

const getProjectTasks = asyncHandler(async (req, res) => {
  const projectId = req.params.id
  const tasks = await Task.find({ partOf: projectId })
  return res.status(200).json({ tasks })
})
module.exports = { createTask, getProjectTasks }
