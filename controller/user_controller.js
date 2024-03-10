const User = require('../model/sigup');
const jwt = require('jsonwebtoken');
const secure = require('../config/secure');
const bcrypt = require('bcrypt');

/**
 * @swagger
 * paths:
 *   /user/sign-up:
 *     post:
 *       summary: Register a new user
 *       tags:
 *         - Authentication
 *       requestBody:
 *         description: User registration information.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - email
 *                 - password
 *               properties:
 *                 name:
 *                   type: string
 *                   description: User's name.
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: User's email address.
 *                 password:
 *                   type: string
 *                   format: password
 *                   description: User's password.
 *       responses:
 *         200:
 *           description: User registered successfully.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User registered successfully!"
 *                 success: true
 *                 newUser:
 *                   name: "John Doe"
 *                   email: "john.doe@example.com"
 *                   _id: "609c4349e9a6b5256020e9b1"
 *         201:
 *           description: User already registered.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User already registered"
 *                 success: true
 *                 user:
 *                   name: "John Doe"
 *                   email: "john.doe@example.com"
 *                   _id: "609c4349e9a6b5256020e9b1"
 *         500:
 *           description: Internal server error in creating the user.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in creating the user"
 *                 success: false
 *                 error: "Error message details"
 */

// code for register the user
module.exports.signup = async (req,res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        if(!user){
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            return res.status(200).json({
                message: "User register successfully!",
                success: true,
                newUser
            })
        }else{
            return res.status(201).json({
                message: "User already registered",
                success: true,
                user
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Ineternal server error in creating the user",
            success: false,
            error: error.message
        })
    }
}

/**
 * @swagger
 * paths:
 *   /user/login:
 *     post:
 *       summary: Log in a user
 *       tags:
 *         - Authentication
 *       requestBody:
 *         description: User login information.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: User's email address.
 *                 password:
 *                   type: string
 *                   format: password
 *                   description: User's password.
 *       responses:
 *         200:
 *           description: User logged in successfully.
 *           content:
 *             application/json:
 *               example:
 *                 message: "You have logged In successfully!!"
 *                 success: true
 *                 data:
 *                   token: "JWT_TOKEN"
 *         400:
 *           description: User not found or incorrect password.
 *           content:
 *             application/json:
 *               example:
 *                 message: "User not found or user does not exist!!"
 *                 success: false
 *         500:
 *           description: Internal server error in sign-in.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Internal server error in signin"
 *                 error: "Error message details"
 */


// code for login the user
module.exports.login = async (req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user || !(await bcrypt.compare(req.body.password, user.password))){
            return res.status(400).json({
                message: "User not found or user does not exist!!",
                success: false,
            })
        }else{
            return res.status(200).json({
                message: "You have logged In successfully!!",
                success: true,
                data:{
                    token: jwt.sign(user.toJSON(), secure.secretOrKey, {expiresIn: "1h"})
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in signin",
            error: error.message
        })
    }
}

