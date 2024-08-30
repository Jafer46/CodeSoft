const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Blog = require('../models/Blog')
const Comment = require('../models/Comment')
const { MESSAGETYPE } = require('../constants/messageConstant')

//goto home page
router.get(
  '/home',
  asyncHandler(async (req, res) => {
    const message = req.flash('message')
    const user = req.session.user ?? null
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(20)
    console.log(blogs)
    const sliderItems = await Blog.find({}).sort({ view: 1 }).limit(5)
    res.render('index.ejs', {
      title: 'Home',
      user: user,
      message,
      blogs,
      sliderItems
    })
  })
)

//goto each blog page
router.get(
  '/blog/:id',
  asyncHandler(async (req, res) => {
    const message = req.flash('message')
    const blog = await Blog.findOne({ _id: req.params.id })
    if (!blog) {
      return res.render('404.ejs', {
        message: 'blog not found',
        type: MESSAGETYPE.ERROR
      })
    }
    blog.view++
    await blog.save()
    const user = req.session.user ?? null
    const comments = await Comment.find({ blogId: blog.id }).sort({
      createdAt: -1
    })
    return res.render('blog.ejs', {
      title: 'blog',
      user: user,
      blog: blog,
      comments: comments,
      message
    })
  })
)

//goto create blog page
router.get(
  '/create',
  asyncHandler(async (req, res) => {
    const message = req.flash('message')
    const user = req.session.user
    return res.render('createBlog.ejs', {
      title: 'Create blog',
      user: user,
      message
    })
  })
)

//goto my blogs page
router.get(
  '/myblogs',
  asyncHandler(async (req, res) => {
    const message = req.flash('message')
    const user = req.session.user
    const blogs = await Blog.find({ bloggerId: user._id })
    return res.render('myblogs.ejs', {
      title: 'my blogs',
      user: user,
      blogger: user,
      blogs: blogs,
      message
    })
  })
)
//goto other people blogs page
router.get(
  '/othersblogs/:id',
  asyncHandler(async (req, res) => {
    const message = req.flash('message')
    const userId = req.params.id
    const user = req.session.user ?? null
    const blogger = await User.findOne({ _id: userId })
    if (!blogger) {
      return res.render('404.ejs', {
        message: 'User not found',
        type: MESSAGETYPE.ERROR
      })
    }
    const blogs = await Blog.find({ bloggerId: userId })
    return res.render('myblogs.ejs', {
      title: "other's blogs",
      user: user,
      bloger: blogger,
      blogs: blogs,
      message
    })
  })
)
//goto search blogs page
router.get(
  '/search',
  asyncHandler(async (req, res) => {
    const message = req.flash('message')
    const user = req.session.user ?? null
    return res.render('search.ejs', {
      title: 'search',
      user: user,
      blogs: null,
      message
    })
  })
)

//goto search blogs page
router.post(
  '/search',
  asyncHandler(async (req, res) => {
    const message = req.flash('message')
    const user = req.session.user ?? null
    console.log('rendered')

    if (!req.body || !req.body.query) {
      return res.render('search', { title: 'search', user: user, blogs: null })
    }

    const query = req.body.query

    try {
      const blogs = await Blog.find({ title: { $regex: query, $options: 'i' } }) // Example filtering by title
      return res.render('search', {
        title: 'search',
        user: user,
        blogs: blogs,
        message
      })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .render('error', { title: 'Error', message: 'Internal Server Error' })
    }
  })
)

//logout
router.get(
  '/logout',
  asyncHandler(async (req, res) => {
    req.session.destroy()
    return res.redirect('/home')
  })
)

module.exports = router
