const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema(
  {
    blogId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'The blog id is required!']
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
