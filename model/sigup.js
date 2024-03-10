const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: name of the user who is joining.
 *         email:
 *           type: string
 *           description: for identify the user.
 *         password:
 *           type: string
 *           description: To authenticate the user.
 *       example:
 *         name: Amit
 *         email: amit@gmail.com
 *         password: 123456
 */

// Schem for the user
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;