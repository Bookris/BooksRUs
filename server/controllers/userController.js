const { User, Comment, Book } = require('../model/schema');

const userController = {};

userController.oauth = async (req, res, next) => {
  console.log("in user controller oauth")
  const { email } = req.body;
  console.log("req.body: ", req.body)
  res.locals.userObject = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return userController.register(req, res, next);
  } else {
    return next();
  }
}

userController.register = async (req, res, next) => {
  // create a doc

  /*  {"username": "tester1",
   "email": "12354@codesmith.io",
   "password": "1234"
   }  */
   
  // checking for user inputed username from register(not set up yet)
  console.log("register", req.body);
  let username;
  if (req.body.username) { 
    username = req.body.username
  }
  else {
    // checking for name from oauth user info (set up)
    username = req.body.name;
  }
  let password = '';
  if (req.body.password) {
    password = req.body.password
  }
  let picture = '';
  if (req.body.picture) {
    picture = req.body.picture
  }
  const { email } = req.body;
  const user = await User.create({ username: username, email: email, password: password, picture: picture })
    // .then((res) => { console.log('user registered!!!!!!'); return next() })
    // .catch((err) => next({ message: { err: 'user registered err' } }));

    console.log('THIS IS NEW USER', user);
    if (user) {
    return next();
    }
    return next({message: { err: 'user registered err' } })
    
};

userController.login = async (req, res, next) => {
  //finds user 
  //if found return next
  //else return next(err)
  //req.body should could contain email, password
  // const { email, password } = req.body;
  const { email } = req.body;
  let password = '';
  if (req.body.password) {
    password = req.body.password
  }
  // console.log('body?????', req.body);
  await User.findOne({ email: email, password: password }) // frontend needs to know the query response format: null/user data
    .then(async (data) => {
      console.log("inside find", data);
      if (data) {
        const user = { ...data._doc };
        const result = await Book.find({ _id: { $in: user.likedBooks } });

        user.likedBooks = result;
        res.locals.user = user
        console.log("user found: ", res.locals.user)
        // console.log('res!!!', data.username);
        res.locals.login = true;
        res.locals.pass = true;
        return next();
      } else {
        res.locals.login = false;
        res.locals.pass = false;
        res.locals.user = null;
        return next();
      }
    })
    .catch((err) => next({ message: { err: 'user login err' } }));
};




module.exports = userController;