const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const { STATUSCODE } = require('../constants/statuscode')

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(STATUSCODE.VALIDATION_ERROR)
    throw new Error('Mandatory fields needed')
  }
  const userExist = await User.find({ email })
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
    bio
  })
  return res.status(STATUSCODE.CREATED).json(user)
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(STATUSCODE.VALIDATION_ERROR)
    throw new Error('Mandatory fields needed')
  }
  const user = await User.findOne({ email })
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
        id: user.id
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
  const { fullName, username, bio } = req.body
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

module.exports = { registerUser, loginUser, updateUser, deleteUser }
