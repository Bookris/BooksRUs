const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// request like: method + /login /register 

//for register, req.body should include a username, email and a password
router.post('/register', userController.register, (req, res) => res.status(200).redirect('/login'));

router.post('/login', userController.login, (req, res) => res.status(200).json(res.locals.user)); //sending back the user info if login was successfull


module.exports = router;