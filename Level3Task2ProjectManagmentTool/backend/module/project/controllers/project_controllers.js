const asyncHandler = require('express-async-handler')
const Project = require('../models/project')
const { STATUSCODE } = require('../../../constants/statuscode')
const Task = require('../models/tasks')

const createProject = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    deadline,
    priority,
    user_list,
    status = 0
  } = req.body
  const userId = req.user.id
  const project = await Project.create({
    creatorId: userId,
    name,
    description,
    priority,
    deadline,
    user_list,
    status
  })
  return res.status(STATUSCODE.CREATED).json(project)
})

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id })
  if (!project) {
    res.status(STATUSCODE.NOT_FOUND)
    throw new Error('Project is not found')
  }
  const updatedProject = await Project.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  )
  return res.status(STATUSCODE.OK).json(updatedProject)
})

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id })
  if (!project) {
    res.status(STATUSCODE.NOT_FOUND)
    throw new Error('Project is not found')
  }
  await Project.deleteOne({ _id: req.params.id })
  return res.status(STATUSCODE.OK).json(project)
})

const getUserProjects = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const projects = await Project.find({
    $or: [{ creatorId: userId }, { userList: userId }]
  }).populate('creatorId userList')
  // Map through projects to add task counts
  const projectsWithTaskCounts = await Promise.all(
    projects.map(async project => {
      const numberOfTasks = await Task.countDocuments({ project_id: project._id })
      const finishedTasks = await Task.countDocuments({
        project_id: project._id,
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

module.exports = { createProject, getUserProjects, updateProject, deleteProject }
