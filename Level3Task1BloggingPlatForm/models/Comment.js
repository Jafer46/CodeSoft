const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema(
  {
    blogId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'The blog id is required!']
    },
    commenterId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'The commenter id is required']
    },
    commenterName: {
      type: String
    },
    commenterAvatar: {
      type: String
    },
    content: {
      type: String,
      required: [true, 'The content is required!']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Comment', CommentSchema)
