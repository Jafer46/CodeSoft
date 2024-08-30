const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const { MESSAGETYPE } = require('../constants/messageConstant')
const bcrypt = require('bcrypt')
const { STATUS } = require('../constants/statusCodes')

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
  if (!user) {
    return res.status(STATUS.NOT_FOUND).json({
      message: { message: 'User Not Found!', type: MESSAGETYPE.ERROR }
    })
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(STATUS.NOT_FOUND).json({
      message: { message: 'User Not Found!', type: MESSAGETYPE.ERROR }
    })
  }
  const checked = await bcrypt.compare(password, user.password)
  if (!checked) {
    return res.status(STATUS.UNAUTHORIZED).json({
      message: { message: 'Incorrect password!', type: MESSAGETYPE.ERROR }
    })
  }
  //req.session.user = user;
  req.session.isAuth = true
  req.session.user = user
  await req.session.save()
  res.cookie('sessionId', req.sessionID)
  // return res.status(STATUS.OK).render('index.ejs', {
  //   title: 'Home',
  //   message: 'Login successful!',
  //   type: MESSAGETYPE.SUCCESS
  // })
  return res.redirect('/home')
})

const createUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return res
      .status(STATUS.CONFLICT)
      .json({ message: { message: 'Email exist!', type: MESSAGETYPE.ERROR } })
  }
  const hashedPassword = await bcrypt.hash(password, 12)
  console.log(hashedPassword)
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    avatar: '',
    bio: ''
  })
  //req.session.user = user;
  req.session.isAuth = true
  req.session.save()
  res.cookie('sessionId', req.sessionID)
  return res.status(STATUS.CREATED).redirect('/home')
})

const updateUser = asyncHandler(async (req, res) => {
  const { username, email, bio } = req.body
  const user = await User.findOne({ _id: req.params.id })
  if (!user) {
    return res.status(STATUS.NOT_FOUND).json({
      message: { message: "User doesn't exist!", type: MESSAGETYPE.ERROR }
    })
  }
  user.username = username ?? user.username
  user.email = email ?? user.email
  user.bio = bio ?? user.bio
  await user.save()
  return res
    .status(STATUS.OK)
    .json({ message: { message: 'User updated!', type: MESSAGETYPE.SUCCESS } })
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
  if (!user) {
    return res.status(STATUS.NOT_FOUND).json({
      message: { message: "User doesn't exist!", type: MESSAGETYPE.ERROR }
    })
  }
  await user.delete()
  return res
    .status(STATUS.OK)
    .json({ message: { message: 'User deleted!', type: MESSAGETYPE.SUCCESS } })
})

module.exports = { loginUser, createUser }
