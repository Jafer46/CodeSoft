const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
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
    //used to identify user for chatengine api with username
    chatSecret: {
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
