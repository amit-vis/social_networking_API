const Post = require('../model/post');
const Profile = require('../model/userProfile');

/**
 * @swagger
 * paths:
 *   /post/create/{id}:
 *     post:
 *       summary: Create a new post for a user profile
 *       tags:
 *         - Post
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the user profile for which the post is created.
 *       requestBody:
 *         description: Post content information.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - content
 *               properties:
 *                 content:
 *                   type: string
 *                   description: The content for the post.
 *       responses:
 *         200:
 *           description: Successfully created a new post.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Your post has been created!!"
 *                 success: true
 *                 post:
 *                   userId: "609c4349e9a6b5256020e9b1"
 *                   content: "I am happy Now"
 *                   createdAt: "2024-03-09T18:36:37.230Z"
 *         400:
 *           description: User does not exist or not found.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User does not exist or user not found!!"
 *                 success: false
 *         500:
 *           description: Internal server error in creating the post.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in creating the post"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */

// code for create the post
module.exports.postCreate = async (req, res)=>{
    try {
        const findUserProfile = await Profile.findById(req.params.id);
        if(!findUserProfile){
            return res.status(400).json({
                message: "User does not exist or user not found!!",
                success: false,
            })
        }else{
            const post = await Post.create({
                userId: findUserProfile._id,
                content: req.body.content
            })
            return res.status(200).json({
                message: "Your post has been created!!",
                success: true,
                post
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in creating the post",
            error: error.message
        })
    }
}
/**
 * @swagger
 * paths:
 *   /post/update/{id}:
 *     put:
 *       summary: Update a post by ID
 *       tags:
 *         - Post
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the post to be updated.
 *       requestBody:
 *         description: Updated post content information.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                   description: The updated content for the post.
 *       responses:
 *         200:
 *           description: Successfully updated the post.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Post updated successfully!!"
 *                 success: true
 *                 findPost:
 *                   userId: "609c4349e9a6b5256020e9b1"
 *                   content: "Updated post content"
 *                   createdAt: "2024-03-09T18:36:37.230Z"
 *         400:
 *           description: Post does not exist or not found.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Post does not exist or post not found!!"
 *                 success: false
 *         500:
 *           description: Internal server error in updating the post.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in updating the post"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */

// code for update the post
module.exports.updatePost = async (req, res)=>{
    try {
        const findPost = await Post.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        if(!findPost){
            return res.status(400).json({
                message: "Post does not exist or post not found!!",
                success: false
            })
        }else{
            return res.status(200).json({
                message: "Post updated successfully!!",
                success: true,
                findPost
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in updating the post!!",
            error: error.message
        })
    }
}

/**
 * @swagger
 * paths:
 *   /post/delete/{id}:
 *     delete:
 *       summary: Delete a post by ID
 *       tags:
 *         - Post
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the post to be deleted.
 *       responses:
 *         200:
 *           description: Successfully deleted the post.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Post deleted successfully!!"
 *                 success: true
 *                 post:
 *                   userId: "609c4349e9a6b5256020e9b1"
 *                   content: "Deleted post content"
 *                   createdAt: "2024-03-09T18:36:37.230Z"
 *         400:
 *           description: Post does not exist or not found.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Post does not exist or post not found!!"
 *                 success: false
 *         500:
 *           description: Internal server error in deleting the post.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in deleting the post"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */

// code for delete the post
module.exports.deletePost = async (req, res)=>{
    try {
        const post = await Post.findOneAndDelete({_id: req.params.id},{new: true});
        if(!post){
            return res.status(400).json({
                message: "post does not exist or post not found!!",
                success: false
            })
        }else{
            return res.status(200).json({
                message: "post deleted successfully!!",
                success: true,
                post
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal server Error in deleting the post!!",
            error: error.message

        })
    }
}

/**
 * @swagger
 * paths:
 *   /post/view/{id}:
 *     get:
 *       summary: View posts of a user by ID
 *       tags:
 *         - Post
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the user whose posts are to be viewed.
 *       responses:
 *         200:
 *           description: Successfully retrieved user posts.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Let's see the Your post"
 *                 success: true
 *                 post:
 *                   userId:
 *                     userId: "609c4349e9a6b5256020e9b1"
 *                     username: "user123"
 *                     bio: "A passionate individual"
 *                     profilePicture: "https://example.com/user123.jpg"
 *                   content: "Post content"
 *                   createdAt: "2024-03-09T18:36:37.230Z"
 *         400:
 *           description: User does not exist or not found.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User does not exist or user not found!!"
 *                 success: false
 *         500:
 *           description: Internal server error in finding the user's posts.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in finding the post"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */

// code for get the post
module.exports.view = async (req,res)=>{
    try {
        const findPost = await Profile.findById(req.params.id);
        const post = await Post.findOne({userId: findPost._id})
        .populate('userId', 'userId username bio profilePicture')
        .sort({createdAt:-1});
        if(!findPost){
            return res.status(400).json({
                message: "user does not exist or user not found!!",
                success: false
            })
        }else{
            return res.status(200).json({
                message: "Let's see the Your post",
                success: true,
                post
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server Error while finding the post!!",
            error: error.message
        })
    }
}
/**
 * @swagger
 * paths:
 *   /post/latest-post/{id}:
 *     get:
 *       summary: Get the latest posts from followed users by user ID
 *       tags:
 *         - Post
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the user for whom the latest posts from followed users are to be retrieved.
 *       responses:
 *         200:
 *           description: Successfully retrieved the latest posts from followed users.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Latest posts from followed users retrieved successfully"
 *                 success: true
 *                 post:
 *                   userId:
 *                     userId: "609c4349e9a6b5256020e9b1"
 *                     username: "user123"
 *                     profilePicture: "https://example.com/user123.jpg"
 *                   content: "Latest post content"
 *                   createdAt: "2024-03-09T18:36:37.230Z"
 *         400:
 *           description: User does not exist or not found.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User does not exist or user not found!!"
 *                 success: false
 *         500:
 *           description: Internal server error in fetching the latest posts.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in fetching the latest posts"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */

// get the latest post of the following user
module.exports.latestPost = async (req, res)=>{
    try {
        const userProfile = await Profile.findById(req.params.id);
        const post = await Post.findOne({userId: {$in: userProfile.following}})
        .sort({createdAt: -1})
        .populate('userId', 'username profilePicture')
        console.log(userProfile)
        return res.status(200).json({
            message: "Latest posts from followed users retrieved successfully",
            success: true,
            post
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in fetching the latest Post",
            error: error.message
        })
    }
}
/**
 * @swagger
 * paths:
 *   /post/social-feed/{id}:
 *     get:
 *       summary: Get social feed posts from followed users by user ID
 *       tags:
 *         - Post
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the user for whom the social feed posts from followed users are to be retrieved.
 *       responses:
 *         200:
 *           description: Successfully retrieved social feed posts from followed users.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Latest posts from users you follow"
 *                 success: true
 *                 posts:
 *                   - _id: "609c4349e9a6b5256020e9b1"
 *                     content: "Social feed post content"
 *                     createdAt: "2024-03-09T18:36:37.230Z"
 *                     userProfile:
 *                       username: "user123"
 *                       profilePicture: "https://example.com/user123.jpg"
 *                   - _id: "609c4349e9a6b5256020e9b2"
 *                     content: "Another social feed post content"
 *                     createdAt: "2024-03-09T19:36:37.230Z"
 *                     userProfile:
 *                       username: "user456"
 *                       profilePicture: "https://example.com/user456.jpg"
 *         404:
 *           description: User profile not found.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User profile not found"
 *                 success: false
 *         500:
 *           description: Internal server error in getting social feed posts.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in getting following posts"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */

// code get the latest social Feed of the following user
module.exports.socialFeed = async (req, res)=>{
    try {
        const userProfile = await Profile.findById(req.params.id);
        if(!userProfile){
            return res.status(404).json({
                message: "User profile not found",
                success: false
            });
        }
        const followingPosts = await Post.aggregate([
            {
                $match: {
                    userId: {$in: userProfile.following }
                }
            },
            {
                $sort: {createdAt: -1}
            },
            {
                $lookup:{
                    from: 'Profile',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'userProfile'
                }
            },
            {
                $unwind: '$userProfile'
            },
            {
                $project: {
                    _id: 1,
                    content: 1,
                    createdAt: 1,
                    userProfile: {
                        username: '$userProfile.username',
                        profilePicture: '$userProfile.profilePicture'
                    }
                }
            }
        ]);
        return res.status(200).json({
            message: "Latest posts from users you follow",
            success: true,
            posts: followingPosts
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in getting following posts",
            error: error.message
        });
    }
}