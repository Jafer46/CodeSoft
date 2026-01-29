const asyncHandler = require('express-async-handler')
const Task = require('../models/tasks')
const { STATUSCODE } = require('../../../constants/statuscode')
const Project = require('../models/project')

const createTask = asyncHandler(async (req, res) => {
  const createdBy = req.user.id
  const {name,
    description,
    project_id,
    completed = false,
    assignedUsers
  } = req.body
  const task = await Task.create({
    name,
    description,
    project_id,
    createdBy,
    completed,
    assignedUsers
  })
  return res.status(200).json(task)
})

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id })
  if (!task) {
    res.status(STATUSCODE.NOT_FOUND)
    throw new Error('Task is not found')
  }
  const { name, description, completed, assignedUsers } = req.body
  task.name = name
  task.description = description
  task.completed = completed
  task.assignedUsers = assignedUsers
  if (completed) {
    const project = await Project.findOne({ _id: task.project_id })
    project.status = 1
    await project.save()
  }
  await task.save()
  return res.status(STATUSCODE.OK).json(task)
})

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id })
  if (!task) {
    res.status(STATUSCODE.NOT_FOUND)
    throw new Error('Task is not found')
  }
  await Task.deleteOne({ _id: req.params.id })
  return res.status(STATUSCODE.OK).json(task)
})

const getProjectTasks = asyncHandler(async (req, res) => {
  const projectId = req.params.id
  const tasks = await Task.find({ project_id: projectId })
  return res.status(200).json(tasks)
})

const getUserTasks = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const tasks = await Task.find({ assignedUsers: userId })
  return res.status(200).json(tasks)
})
module.exports = {
  createTask,
  getProjectTasks,
  getUserTasks,
  updateTask,
  deleteTask
}
