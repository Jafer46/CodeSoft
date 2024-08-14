const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const Blog = require('../models/Blog')
const { MESSAGETYPE } = require('../constants/messageConstant')

//goto home page
router.get(
  '/home',
  asyncHandler(async (req, res) => {
    const user = req.session.user
    res.render('index.ejs', { title: 'Home', user: user })
  })
)

//goto each blog page
router.get(
  '/blog/:id',
  asyncHandler(async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id })
    if (!blog) {
      return res.render('404.ejs', {
        message: 'blog not found',
        type: MESSAGETYPE.ERROR
      })
    }
    const comments = await Comment.find({ blogId: blog.id })
    return res.render('blog.ejs', { blog: blog, comments: comments })
  })
)

//goto create blog page
router.get(
  '/create',
  asyncHandler(async (req, res) => {
    const user = req.session.user
    return res.render('createBlog.ejs', { title: 'Create blog', user: user })
  })
)

//goto my blogs page
router.get(
  '/myblogs',
  asyncHandler(async (req, res) => {
    const user = req.session.user
    console.log(user)
    const blogs = await Blog.find({ bloggerId: user._id })
    return res.render('myblogs.ejs', {
      title: 'my blogs',
      user: user,
      blogs: blogs
    })
  })
)

module.exports = router
