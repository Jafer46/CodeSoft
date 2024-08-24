const Comment = require('../models/Comment')
const asyncHandler = require('express-async-handler')
const { STATUS } = require('../constants/statusCodes')
const { MESSAGETYPE } = require('../constants/messageConstant')

const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ blogId: req.params.id })
  if (!comments) {
    return res.status(STATUS.NOT_FOUND).json({
      message: { message: 'Comment Not found!', type: MESSAGETYPE.ERROR }
    })
  }
  return res.status(STATUS.OK).json(comments)
})

const getComment = asyncHandler(async (req, res) => {})
const createComment = asyncHandler(async (req, res) => {
  const { content, blogId } = req.body
  if (!content) {
    return res.status(STATUS.BAD_REQUEST).json({
      message: { message: 'Content is required', type: MESSAGETYPE.ERROR }
    })
  }
  const user = req.session.user
  const commentCreated = await Comment.create({
    blogId,
    content,
    commenterId: user._id,
    commenterName: user.username,
    commenterAvatar: user.avatar
  })
  return res.redirect(`/blog/${blogId}`)
})

//todo: this update comment is not finished yet
const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.id })
  if (!comment) {
    return res.status(STATUS.NOT_FOUND).json({
      message: { message: 'Comment Not found!', type: MESSAGETYPE.ERROR }
    })
  }
})

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.id })
  if (!comment) {
    return res.status(STATUS.NOT_FOUND).json({
      message: { message: 'Comment Not found!', type: MESSAGETYPE.ERROR }
    })
  }
  await comment.delete()
  return res
    .status(STATUS.OK)
    .json({ message: 'Comment delted!', type: MESSAGETYPE.SUCCESS })
})

module.exports = { createComment }
