const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    partOf: {
      type: [mongoose.Types.ObjectId],
      ref: 'Project'
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    assignedUsers: {
      type: [mongoose.Types.ObjectId],
      ref: 'User'
    },
    completed: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Task', taskSchema)
