const asyncHandler = require('express-async-handler')
const Blog = require('../models/Blog')
const { MESSAGETYPE } = require('../constants/messageConstant')
const { STATUS } = require('../constants/statusCodes')
const cloudinary = require('../config/cloudinary')

const getBlogs = asyncHandler(async (req, res) => {})

const getBlog = asyncHandler(async (req, res) => {
  const blog = Blog.findOne({ _id: req.params.id })
  if (blog) {
    return res.json({
      message: { message: 'blog not found', type: MESSAGETYPE.ERROR }
    })
  }
  blog.view++
  await blog.save()
  return res.json(blog)
})

const createBlog = asyncHandler(async (req, res) => {
  console.log(req.file.path)
  const result = await cloudinary.uploader.upload(req.file.path)
  console.log(result.secure_url)
  console.log(req.session.user)

  if (!req.session.isAuth || !req.session.user) {
    return res
      .status(STATUS.NOT_FOUND)
      .render('404.ejs', {
        message: { message: 'blog not found', type: MESSAGETYPE.ERROR }
      })
  }
  const imageUrl = result.secure_url
  const user = req.session.user
  const { title, description, view = 0 } = req.body
  const createdBlog = await Blog.create({
    title,
    description,
    bloggerId: user._id,
    bloggerAvatar: user.avatar,
    bloggerName: user.username,
    view,
    imageUrl
  })
  return res.redirect('/myblogs')
})

const updateBlog = asyncHandler(async (req, res) => {
  const blog = Blog.findOne({ _id: req.params.id })
  if (blog) {
    return res.json({
      message: { message: 'blog not found', type: MESSAGETYPE.ERROR }
    })
  }

  return res.json({
    message: { message: 'blog updated', type: MESSAGETYPE.SUCCESS }
  })
})

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = Blog.findOne({ _id: req.params.id })
  if (blog) {
    return res.json({
      message: { message: 'blog not found', type: MESSAGETYPE.ERROR }
    })
  }
  return res.json({
    message: { message: 'blog deleted', type: MESSAGETYPE.SUCCESS }
  })
})

module.exports = { getBlog, createBlog, deleteBlog }
