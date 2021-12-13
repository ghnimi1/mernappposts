const mongoose = require('mongoose')

const PostsModel = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please provide content'],
        maxlength: 500
    },
    photo: {
        type: String,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    },
    likeCount: {
        type: Number,
        default: 0
    },
    likedBy: [
        {
            author: mongoose.Schema.Types.ObjectId,
            name: String,
            isLiked: {
                type: Boolean
            }
        }
    ],
    comments: {
        type: [
            {
                createdBy: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                    required: [true, 'Please provide user']
                },
                comment: String,
                timestamp: Number,
            }
        ],
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('posts', PostsModel)