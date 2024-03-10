const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');
const limitter = require('../config/limitter');

// set the limmiter
router.use(limitter)

// routes for the user controller
router.post('/sign-up', userController.signup);
router.post('/sign-in', userController.login);


module.exports = router;