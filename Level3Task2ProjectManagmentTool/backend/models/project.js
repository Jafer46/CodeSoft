const mongoose = require('mongoose')

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    userList: {
      type: [mongoose],
      ref: 'User'
    },
    status: {
      type: Number
    },
    dueDate: {}
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Project', projectSchema)
