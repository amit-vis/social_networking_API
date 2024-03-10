const Profile = require('../model/userProfile');
const User = require('../model/sigup');

/**
 * @swagger
 * paths:
 *   /user-profile/create/{id}:
 *     post:
 *       summary: Create a user profile
 *       tags:
 *         - Profile
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the user for whom the profile is to be created.
 *       requestBody:
 *         description: User profile information.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - username
 *               properties:
 *                 username:
 *                   type: string
 *                   description: User's username.
 *                 bio:
 *                   type: string
 *                   description: User's biography.
 *                 profilePicture:
 *                   type: string
 *                   description: URL to the user's profile picture.
 *       responses:
 *         200:
 *           description: User profile created successfully.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User Profile has been created!!"
 *                 success: true
 *                 newProfile:
 *                   username: "JohnDoe"
 *                   bio: "A passionate individual"
 *                   profilePicture: "https://example.com/johndoe_profile.jpg"
 *         201:
 *           description: User profile already exists.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User already exist"
 *                 success: false
 *         500:
 *           description: Internal server error in creating the user profile.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server in Creating the user Profile"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */

// code for create the user Profile
module.exports.createUserProfile = async (req, res)=>{
    try {
        const findUser = await User.findById(req.params.id)
        const userProfile = await Profile.findOne({user: findUser._id});
        if(!findUser || !userProfile){
            const newProfile = await Profile.create({
                username: req.body.username,
                bio: req.body.bio,
                profilePicture: req.body.profilePicture,
                user: findUser._id
            })
            return res.status(200).json({
                message: "User Profile has been created!!",
                success: true,
                newProfile
            })
        }else{
            return res.status(201).json({
                message: "User already exist",
                success: false,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server in Creating the the user Profile",
            error: error.message
        })
    }
}
/**
 * @swagger
 * paths:
 *   /user-profile/update/{userId}:
 *     put:
 *       summary: Update a user profile
 *       tags:
 *         - Profile
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: The user ID whose profile is to be updated.
 *       requestBody:
 *         description: Updated user profile information.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Updated username.
 *                 bio:
 *                   type: string
 *                   description: Updated biography.
 *                 profilePicture:
 *                   type: string
 *                   description: Updated URL to the user's profile picture.
 *       responses:
 *         200:
 *           description: User profile updated successfully.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User profile has been updated successfully!!"
 *                 success: true
 *                 findUserProfile:
 *                   username: "UpdatedJohnDoe"
 *                   bio: "An updated passionate individual"
 *                   profilePicture: "https://example.com/updated_johndoe_profile.jpg"
 *         400:
 *           description: User not found or user does not exist.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User not found or user does not exist!!"
 *                 success: false
 *         500:
 *           description: Internal server error in updating the user profile.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in updating the user Profile"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */

// update the user profilr details
module.exports.updateUserProfile = async (req,res)=>{
    try {
        const findUserProfile = await 
        Profile.findOneAndUpdate({userId: req.params.userId},{username: req.body.username,bio: req.body.bio,profilePicture: req.body.profilePicture}, {new: true});
        if(!findUserProfile){
            return res.status(400).json({
                message: "User not found or user does not exist!!",
                success: false
            })
        }else{
            return res.status(200).json({
                message: "User profile has been updated successfully!!",
                success: true,
                findUserProfile
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Inerternal server error in updating the user Profile",
            error: error.message
        })
    }
}
/**
 * @swagger
 * paths:
 *   /user-profile/delete/{userId}:
 *     delete:
 *       summary: Delete a user profile
 *       tags:
 *         - Profile
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: The user ID whose profile is to be deleted.
 *       responses:
 *         200:
 *           description: User profile deleted successfully.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User Profile has been deleted"
 *                 success: true
 *                 deleteUserProfile:
 *                   username: "DeletedJohnDoe"
 *                   bio: "An updated passionate individual"
 *                   profilePicture: "https://example.com/deleted_johndoe_profile.jpg"
 *         400:
 *           description: User does not exist or user not found.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User does not exist or user not found"
 *                 success: false
 *         500:
 *           description: Internal server error in deleting the user profile.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server Error in deleting the user Profile!!"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */


// code for delete user profile
module.exports.deleteUserProfile = async (req, res)=>{
    try {
        const deleteUserProfile = await Profile.findOneAndDelete({userId: req.params.userId}, {new: true});
        if(!deleteUserProfile){
            return res.status(400).json({
                message: "User does not exist or user not found",
                success: false
            })
        }else{
            return res.status(200).json({
                message: "User Profile has been deleted",
                success: true,
                deleteUserProfile
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server Error in deleting the user Profile!!",
            error: error.message
        })
    }
}
/**
 * @swagger
 * paths:
 *   /userProfile/view/{userId}:
 *     get:
 *       summary: View user profile
 *       tags:
 *         - Profile
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the user for whom the profile is to be viewed.
 *       responses:
 *         200:
 *           description: See the user profile.
 *           content:
 *             application/json:
 *               example:
 *                 message: "See the user Profile"
 *                 success: true
 *                 findUserProfile:
 *                   username: "john_doe"
 *                   bio: "Passionate about technology."
 *                   profilePicture: "https://example.com/john_doe_profile.jpg"
 *                   user:
 *                     name: "John Doe"
 *                     email: "john.doe@example.com"
 *                     _id: "609c4349e9a6b5256020e9b1"
 *         400:
 *           description: User does not exist or user not found.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User does not exist or user not found"
 *                 success: false
 *         500:
 *           description: Internal server error in getting the user profile.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in getting the user Profiles"
 *                 error: "Error message details"
 *       security:
 *         - jwt: []  # Assuming you have defined 'jwt' security scheme globally
 */

// code for check the user details
module.exports.viewUserProfile = async (req, res)=>{
    try {
        const findUserProfile = await Profile.findOne({userId: req.params.userId})
        .populate({
            path: 'user',
            select: 'name email'
        });
        if(!findUserProfile){
            return res.status(400).json({
                message: "User does not exist or user not found"
            })
        }else{
            return res.status(200).json({
                message: "See the user Profile",
                success: true,
                findUserProfile
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in getting the user Profiles",
            error: error.message
        })
    }
}