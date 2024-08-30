const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const { STATUSCODE } = require('../constants/statuscode')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Project = require('../models/project')
const Task = require('../models/tasks')

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(STATUSCODE.VALIDATION_ERROR)
    throw new Error('Mandatory fields needed')
  }
  const userExist = await User.findOne({ email: email })
  if (userExist) {
    res.status(STATUSCODE.CONFLICT)
    throw new Error('Usre already exists')
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    fullName,
    username,
    avatar: '',
    email,
    password: hashedPassword,
    bio: ''
  })
  return res.status(STATUSCODE.CREATED).json(user)
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(STATUSCODE.VALIDATION_ERROR)
    throw new Error('Mandatory fields needed')
  }
  const user = await User.findOne({ email: email })
  if (!user) {
    res.status(STATUSCODE.NOT_FOUND)
    throw new Error('user not found')
  }
  const passwordMatched = await bcrypt.compare(password, user.password)
  if (!passwordMatched) {
    res.status(STATUSCODE.UNAUTHORIZED)
    throw new Error('incorrect password')
  }
  const accessToken = jwt.sign(
    {
      user: {
        email: user.email,
        id: user._id
      }
    },
    process.env.ACCESS_TOKEN_SECRETE,
    { expiresIn: '4hr' }
  )
  const userData = {
    username: user.username,
    avatar: user.avatar
  }
  return res.status(STATUSCODE.OK).json({ user, accessToken })
})

const updateUser = asyncHandler(async (req, res) => {
  const { fullName, username, eamil, bio } = req.body
  const user = await User.findOne({ _id: req.user.id })
  if (!user) {
    res.status(STATUSCODE.NOT_FOUND)
    throw new Error('user not found')
  }
  user.username = username ?? user.username
  user.bio = bio ?? user.bio
  user.fullName = fullName ?? user.fullName
  await user.save()
  return res.status(STATUSCODE.OK).json(user)
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user.id })
  if (!user) {
    res.status(STATUSCODE.NOT_FOUND)
    throw new Error('user not found')
  }

  await user.delete()
  return res.status(STATUSCODE.OK).json(user)
})

const searchUser = asyncHandler(async (req, res) => {
  const { query } = req.query // Assuming the search term is passed as a query parameter
  console.log(query)
  if (!query) {
    return res.status(400).json({ message: 'Search query is required' })
  }

  // Search for users by username or email (case insensitive)
  const users = await User.find({
    $or: [
      { username: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  })

  res.status(200).json(users)
})

const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user.id

  // Fetch projects where the user is either the creator or in the userList
  const proj = await Project.find({
    $or: [{ creatorId: userId }, { userList: userId }]
  })
    .limit(2)
    .populate('creatorId userList')

  // Map through proj to add task counts
  const projects = await Promise.all(
    proj.map(async project => {
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

  // Fetch tasks assigned to the user
  const myTasks = await Task.find({ assignedUsers: userId })

  // Fetch all project deadlines
  const deadlines = await Project.find({ userList: userId })
    .select('deadline')
    .exec()
  const deadlineList = deadlines.map(project => project.deadline)

  const tasks = await Task.aggregate([
    {
      $match: {
        assignedUsers: userId
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        completedCount: {
          $sum: { $cond: ['$completed', 1, 0] } // Count of completed tasks
        },
        uncompletedCount: {
          $sum: { $cond: ['$completed', 0, 1] } // Count of uncompleted tasks
        }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 } // Sort by year and month
    }
  ])
  // Return response with projects and my tasks
  return res
    .status(STATUSCODE.OK)
    .json({ projects, myTasks, deadlineList, tasks })
})
module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  searchUser,
  getDashboard
}
