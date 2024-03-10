
const express = require('express');
const router = express.Router();
const followingController = require('../controller/following_controller');
const passport = require('passport');
const limitter = require('../config/limitter');

// set the limmiter
router.use(limitter)

// routes for the following controller
router.post('/follow/:userId',passport.authenticate('jwt', {session: false}), followingController.follow);
router.post('/unfollow/:userId', passport.authenticate('jwt', {session: false}), followingController.unFollow);
router.get('/get-followers/:userId',passport.authenticate('jwt', {session: false}),followingController.getFollowers);
router.get('/get-following/:userId',passport.authenticate('jwt', {session: false}),followingController.getFollowing);


module.exports = router