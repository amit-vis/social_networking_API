const express = require('express');
const router = express.Router();
const postController = require('../controller/post_controller');
const passport = require('passport');
const limitter = require('../config/limitter');

// set the limmiter
router.use(limitter)

// routes for the post controller
router.post('/create/:id',passport.authenticate('jwt', {session: false}) ,postController.postCreate);
router.put('/update/:id',passport.authenticate('jwt', {session: false}),postController.updatePost );
router.delete('/delete/:id',passport.authenticate('jwt', {session: false}),postController.deletePost);
router.get('/view/:id',passport.authenticate('jwt', {session: false}), postController.view);
router.get('/latest-post/:id',passport.authenticate('jwt', {session: false}), postController.latestPost);
router.get('/social-feed/:id',passport.authenticate('jwt', {session: false}), postController.socialFeed)

module.exports = router