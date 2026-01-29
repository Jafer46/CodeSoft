const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    project_id: {
      type: [mongoose.Types.ObjectId],
      ref: 'Project'
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    assigned_user_ids: {
      type: [mongoose.Types.ObjectId],
      ref: 'User'
    },
    status: {
      enum: ['DRAFT', 'IN_PROGRESS', 'COMPLETED'],
      type: String
    },
    completed: {
      type: Boolean
    },
    due_date: {
      type: Date
    },
    priority: {
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Task', taskSchema)
