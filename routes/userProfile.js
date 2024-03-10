const express = require('express');
const router = express.Router();
const profileController = require('../controller/userProfile_controller');
const passport = require('passport');
const limitter = require('../config/limitter');

// set the limmiter
router.use(limitter)

// routes for the Profile controller
router.post('/create/:id',passport.authenticate('jwt', {session: false}) ,profileController.createUserProfile);
router.put('/update/:userId', passport.authenticate('jwt', {session: false}), profileController.updateUserProfile);
router.delete('/delete/:userId', passport.authenticate('jwt', {session: false}), profileController.deleteUserProfile);
router.get('/view/:userId', passport.authenticate('jwt', {session: false}), profileController.viewUserProfile);

module.exports = router;