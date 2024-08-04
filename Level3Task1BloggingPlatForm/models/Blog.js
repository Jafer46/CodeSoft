const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    bloggerId: {
        type: mongoose.Types.ObjectId,
        required: [true, "the blogger's Id id required!"]
    },
    title: {
        type: String,
        required: [true, 'please enter title of blog!']
    },
    view: {
        type: Number,
    },
    imageUrl: {
        type: String,
        required: [true, 'please selecte the image to upload!']
    },
    
},{
    timestamps: true,
})

module.exports = mongoose.model('Blog', BlogSchema);