const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('./auth.controller');

router.get('/logout', function(req, res) {
  req.logout();
  res.send({ response: 'success' });
});

// Setting up the passport middleware for each of the OAuth providers
const githubAuth = passport.authenticate('github');

// Routes that are triggered by the callbacks from each OAuth provider once
// the user has authenticated successfully
router.get('/chatpage', githubAuth, authController.github);

// This custom middleware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right
// socket
router.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});

router.get('/github', githubAuth);

module.exports = router;
