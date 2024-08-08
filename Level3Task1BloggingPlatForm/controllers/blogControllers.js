const asyncHandler = require("express-async-handler");
const Blog = require("../models/Blog");
const { MESSAGETYPE } = require("../constants/messageConstant");

const getBlogs = asyncHandler(async (req, res) => {});

const getBlog = asyncHandler(async (req, res) => {
  const blog = Blog.findOne({ _id: req.params.id });
  if (blog) {
    return res.json({ message: "blog not found", type: MESSAGETYPE.ERROR });
  }
  return res.json(blog);
});

const createBlog = asyncHandler(async (req, res) => {});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = Blog.findOne({ _id: req.params.id });
  if (blog) {
    return res.json({ message: "blog not found", type: MESSAGETYPE.ERROR });
  }

  return res.json({
    message: "blog successfuly updated",
    type: MESSAGETYPE.SUCCESS,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = Blog.findOne({ _id: req.params.id });
  if (blog) {
    return res.json({ message: "blog not found", type: MESSAGETYPE.ERROR });
  }
  return res.json({
    message: "blog successfuly deleted",
    type: MESSAGETYPE.SUCCESS,
  });
});
