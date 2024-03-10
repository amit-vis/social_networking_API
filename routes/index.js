const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

// connect to the router here we use the router file
router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/user-profile', require('./userProfile'));
router.use('/post', require('./post'))
router.use('/following', require('./following'));

module.exports = router