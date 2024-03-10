const mongoose = require('mongoose');
const uuid = require('uuid')

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - userId
 *         - username
 *         - user
 *       properties:
 *         userId:
 *           type: string
 *           description: Unique user id for identification.
 *         username:
 *           type: string
 *           description: User's username.
 *         bio:
 *           type: string
 *           description: User's biography.
 *         profilePicture:
 *           type: string
 *           description: URL to the user's profile picture.
 *         user:
 *           type: string
 *           description: User's ObjectId referencing the 'User' model.
 *         followers:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *           description: Array of ObjectId references to followers' profiles.
 *         following:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *           description: Array of ObjectId references to profiles that the user is following.
 *       example:
 *         userId: "1a2b3c4d5e6f"
 *         username: "amit_username"
 *         bio: "Passionate about technology."
 *         profilePicture: "https://example.com/amit_profile.jpg"
 *         user: "607c7f1e810c197f7c1f3030"  
 *         followers:
 *           - "607c7f1e810c197f7c1f3031" 
 *           - "607c7f1e810c197f7c1f3032"
 *         following:
 *           - "607c7f1e810c197f7c1f3033" 
 *           - "607c7f1e810c197f7c1f3034"
 */

// user profile schema
const userProfileSchema = mongoose.Schema({
    userId:{
        type: String,
        default: uuid.v4
    },
    username:{
        type: String,
        required: true
    },
    bio:{
        type: String
    },
    profilePicture:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
        },
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
        },
    ],
},{
    timestamps: true
});

const Profile = mongoose.model('Profile', userProfileSchema);
module.exports = Profile;