const mongoose = require('mongoose')

const projectSchema = mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    userList: {
      type: [mongoose.Types.ObjectId],
      ref: 'User'
    },
    priority: {
      type: String
    },
    status: {
      type: Number
    },
    deadline: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Project', projectSchema)
