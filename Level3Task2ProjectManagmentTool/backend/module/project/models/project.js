const mongoose = require('mongoose')

const projectSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    chat_room_id: {
      type: Number
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    user_list: {
      type: [mongoose.Types.ObjectId],
      ref: 'User'
    },
    priority: {
      type: String
    },
    status: {
      enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'],
      type: String
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
