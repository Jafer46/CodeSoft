const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
  {
    projectId: {
      type: mongoose.Types.ObjectId,
      ref: 'Project'
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String,
      required: [true, 'Content is required!']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Message', messageSchema)
