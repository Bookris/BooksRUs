const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// server OAuth controller will check if user exists
      // if not, create user
      // if so, assign a JWT that is then registered into user schema
        // that field (JWT) will expire in 5 min (for now) - works in MongoDB
          // session_id, created_at, expires_at
          // token is good for 5 min so each time try to access profile, token in cookie
          // send cookie to server - server checks if cookie matches
            // if so, let them in
            // if not, kick them out
    // attempt: redirect from server (no navigate from frontend) - would have to see if this works with browser router

//for google oauth, req.body should include entire response from google api
router.post('/', 
  // check to see if user exits
  // if so, login
  // if not, register first
  userController.oauth,
  userController.login,
  (req, res) => res.status(200).redirect('/profile'));

module.exports = router;