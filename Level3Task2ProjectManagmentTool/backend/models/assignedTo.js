const mongoose = require('mongoose')

const assignedToSchema = mongoose.Schema({
  taskId: {
    type: mongoose.Types.ObjectId,
    ref: 'Task'
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
})
