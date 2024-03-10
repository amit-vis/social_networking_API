const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - userId
 *         - content
 *         - createdAt
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the associated profile.
 *         content:
 *           type: string
 *           description: The content for the post.
 *         createdAt:
 *           type: date
 *           description: the date to track the when post was created.
 *       example:
 *         product: 609c4349e9a6b5256020e9b1
 *         content: I am happy Now
 *         createdAt: 2024-03-09T18:36:37.230Z
 */

// this the Schema for the post
const postSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
},{
    timestamps: true
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;