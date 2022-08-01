const { application } = require('express');
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// /search, /like(update user doc), /comment(update book doc), /unlike
// stretch: friends shelf

// user input keyword, click the button, get that keyword to pass to request URL to be params
// frontend work

//should send the isbn of the book so it can be identified. also should send back the user email as well to identify where to add liked book
router.post('/like', bookController.like, (req, res) => res.status(200).json(res.locals.data));

router.post('/unLike', bookController.unLike, (req, res) => res.status(200).json(res.locals.data));



module.exports = router;