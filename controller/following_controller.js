const Profile = require('../model/userProfile');

/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: All the operations related to following users
 */

/**
 * @swagger
 * paths:
 *   /following/follow/{userId}:
 *     post:
 *       summary: Follow a user
 *       tags:
 *         - Follow
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: The user ID of the target user to follow.
 *       responses:
 *         200:
 *           description: Successfully followed the user.
 *           content:
 *             application/json:
 *               example:
 *                 message: "You are now following the user"
 *                 success: true
 *         400:
 *           description: Bad request, e.g., trying to follow oneself.
 *           content:
 *             application/json:
 *               example:
 *                 message: "You cannot follow yourself"
 *                 success: false
 *         404:
 *           description: Target user profile not found.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Target user profile not found"
 *                 success: false
 *         500:
 *           description: Internal server error in following user.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in following user"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */

// code for follow mechanism
module.exports.follow = async (req, res) => {
    try {
        const userProfile = await Profile.findOne({ user: req.user.id });
        const targetUserProfile = await Profile.findOne({ userId: req.params.userId });

        if (!targetUserProfile) {
            return res.status(404).json({
                message: "Target user profile not found",
                success: false
            });
        }
    
        if (userProfile.userId === targetUserProfile.userId) {
            return res.status(400).json({
                message: "You cannot follow yourself",
                success: false
            });
        }

      
        if (userProfile.following.includes(targetUserProfile.id)) {
            return res.status(400).json({
                message: "You are already following this user",
                success: false
            });
        }
        await Profile.findOneAndUpdate({user: userProfile.user}, {$push:{following: targetUserProfile.id}})
        await Profile.findOneAndUpdate({user: targetUserProfile.user}, {$push:{followers: userProfile.id}})

        return res.status(200).json({
            message: "You are now following the user",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in following user",
            error: error.message
        });
    }
}

/**
 * @swagger
 * paths:
 *   /following/unfollow/{userId}:
 *     post:
 *       summary: Unfollow a user
 *       tags:
 *         - Follow
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: The user ID of the target user to unfollow.
 *       responses:
 *         200:
 *           description: Successfully unfollowed the user.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Now you are unfollowing the user"
 *                 success: true
 *         400:
 *           description: Bad request, e.g., trying to unfollow oneself or not following the user.
 *           content:
 *             application/json:
 *               example:
 *                 message: "You cannot Unfollow yourself"
 *                 success: false
 *         404:
 *           description: Target user profile not found.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Target user profile not found"
 *                 success: false
 *         500:
 *           description: Internal server error in unfollowing user.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in unfollowing user"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */

// code for Unfollow mechanism
module.exports.unFollow = async (req, res) => {
    try {
        const userProfile = await Profile.findOne({ user: req.user.id });
        const targetUserProfile = await Profile.findOne({ userId: req.params.userId });

        if (!targetUserProfile) {
            return res.status(404).json({
                message: "Target user profile not found",
                success: false
            });
        }
      
        if (userProfile.userId === targetUserProfile.userId) {
            return res.status(400).json({
                message: "You cannot Unfollow yourself",
                success: false
            });
        }

    
        if (!userProfile.following.includes(targetUserProfile.id)) {
            return res.status(400).json({
                message: "You are not following this user yet",
                success: false
            });
        }
        await Profile.findOneAndUpdate({user: userProfile.user}, {$pull: {following: targetUserProfile.id}})
        await Profile.findOneAndUpdate({user: targetUserProfile.user}, {$pull: {followers: userProfile.id}})

        return res.status(200).json({
            message: "Now you are unfollow the user",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in following user",
            error: error.message
        });
    }
}

/**
 * @swagger
 * paths:
 *   /following/followers/{userId}:
 *     get:
 *       summary: Get followers of a user
 *       tags:
 *         - Follow
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: The user ID for which followers are to be retrieved.
 *       responses:
 *         200:
 *           description: Successfully retrieved the list of followers.
 *           content:
 *             application/json:
 *               example:
 *                 message: "List of followers"
 *                 success: true
 *                 followers:
 *                   - user1_profile_object
 *                   - user2_profile_object
 *         400:
 *           description: User not found or does not exist.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User does not exist or user does not found!!"
 *                 success: false
 *         500:
 *           description: Internal server error in getting followers' details.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in getting followers details"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */

// code for get data of all the followers
module.exports.getFollowers = async (req, res)=>{
    try {
        const getFollowers = await Profile.findOne({userId: req.params.userId})
        .populate('followers');
        if(getFollowers){
            
            return res.status(200).json({
                message: "List of followers",
                success: true,
                followers: getFollowers.followers
            })

        }else{
            return res.status(400).json({
                message: "user does not found or user does not exist!!",
                success: false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in getting the followers details",
            error: error.message
        });
    }
}
/**
 * @swagger
 * paths:
 *   /following/following/{userId}:
 *     get:
 *       summary: Get users that the specified user is following
 *       tags:
 *         - Follow
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: The user ID for which following users are to be retrieved.
 *       responses:
 *         200:
 *           description: Successfully retrieved the list of users being followed.
 *           content:
 *             application/json:
 *               example:
 *                 message: "List of the Following!!"
 *                 success: true
 *                 following:
 *                   - user1_profile_object
 *                   - user2_profile_object
 *         400:
 *           description: User not found or does not exist.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User does not exist or user does not found!!"
 *                 success: false
 *         500:
 *           description: Internal server error in getting following details.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in getting following details"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */

// code for get data of all the following
module.exports.getFollowing = async (req, res)=>{
    try {
        const userProfile = await Profile.findOne({userId: req.params.userId})
        .populate('following')
        if(userProfile){
            return res.status(200).json({
                message: "List of the Following!!",
                success: true,
                following:userProfile.following
            })
        }else{
            return res.status(400).json({
                message: "user does not found or user does not exist!!",
                success: false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in getting the following details",
            error: error.message
        });
    }
}

