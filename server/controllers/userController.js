const { User, Comment, Book } = require('../model/schema');

const userController = {};

userController.register = async (req, res, next) => {
  // create a doc

  /*  {"username": "tester1",
   "email": "12354@codesmith.io",
   "password": "1234"
   }  */
  const { username, email, password } = req.body;
  await User.create({ username: username, email: email, password: password })
    .then((res) => { console.log('user registered!!!!!!'); return next() })
    .catch((err) => next({ message: { err: 'user registered err' } }));
};

userController.login = async (req, res, next) => {
  //finds user 
  //if found return next
  //else return next(err)
};

module.exports = userController;