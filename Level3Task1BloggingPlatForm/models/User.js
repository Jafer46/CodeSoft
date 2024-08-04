const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter name']
    }, 
    email:{
        type: String,
        required: [true, "please enter email"],
    },
    password: {
        type: String,
        required: [true, "please enter password"],
    },
    avatar: String,
    
    bio: String,
})


module.exports = mongoose.model('User', UserSchema);