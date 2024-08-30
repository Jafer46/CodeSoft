const asyncHandler = require('express-async-handler')
const Project = require('../models/project')
const { STATUSCODE } = require('../constants/statuscode')
const Task = require('../models/tasks')

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

const getUserProjects = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const projects = await Project.find({
    $or: [{ creatorId: userId }, { userList: userId }]
  }).populate('creatorId userList')
  // Map through projects to add task counts
  const projectsWithTaskCounts = await Promise.all(
    projects.map(async project => {
      const numberOfTasks = await Task.countDocuments({ partOf: project._id })
      const finishedTasks = await Task.countDocuments({
        partOf: project._id,
        completed: true
      })

      return {
        ...project._doc, // Include existing project fields
        numberOfTasks, // Total task count
        finishedTasks // Count of completed tasks
      }
    })
  )

  return res.status(STATUSCODE.OK).json(projectsWithTaskCounts)
})

module.exports = { createProject, getUserProjects }
