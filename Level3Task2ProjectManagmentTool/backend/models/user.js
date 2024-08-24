const mongoose = require('mongoose')

const UserSchema = mongoose.schema(
  {
    fullName: {
      type: String
    },
    email: {
      type: String
    },
    username: {
      type: String
    },
    password: {
      type: String
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)
