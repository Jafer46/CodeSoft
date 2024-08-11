const asyncHandler = require('express-async-handler')
const Blog = require('../models/Blog')
const { MESSAGETYPE } = require('../constants/messageConstant')
const { STATUS } = require('../constants/statusCodes')

const getBlogs = asyncHandler(async (req, res) => {})

const getBlog = asyncHandler(async (req, res) => {
  const blog = Blog.findOne({ _id: req.params.id })
  if (blog) {
    return res.json({ message: 'blog not found', type: MESSAGETYPE.ERROR })
  }
  blog.view++
  await blog.save()
  return res.json(blog)
})

const createBlog = asyncHandler(async (req, res) => {
  if (!req.session.isAtuh || !req.session.user) {
    return res
      .status(STATUS.NOT_FOUND)
      .render('404.ejs', { message: 'User not found' })
  }
  const user = req.session.user
  const { title, description, view = 0 } = req.body
  const createdBlog = await Blog.create({
    title,
    description,
    bloggerId: user._id,
    bloggerAvatar: user.avatar,
    bloggerName: user.username,
    view
  })
  return res.redirect()
})

const updateBlog = asyncHandler(async (req, res) => {
  const blog = Blog.findOne({ _id: req.params.id })
  if (blog) {
    return res.json({ message: 'blog not found', type: MESSAGETYPE.ERROR })
  }

  return res.json({
    message: 'blog successfuly updated',
    type: MESSAGETYPE.SUCCESS
  })
})

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = Blog.findOne({ _id: req.params.id })
  if (blog) {
    return res.json({ message: 'blog not found', type: MESSAGETYPE.ERROR })
  }
  return res.json({
    message: 'blog successfuly deleted',
    type: MESSAGETYPE.SUCCESS
  })
})

module.exports = { getBlog, createBlog, deleteBlog }
