const User = require('../models/userModel');

const userController = {};

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `userController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in userController.${method}. Check server logs for more details.`,
    },
  };
};

/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err)
      return next(
        'Error in userController.getAllUsers: ' + JSON.stringify(err)
      );

    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = async (req, res, next) => {
  // write code here
  const { username, password } = req.body;
  console.log(
    `CreateUser POST: ${username} ${typeof password} ${password} ${typeof password}`
  );
  // pull username/password off request and validate data
  if (username === '' || password === '') {
    res.locals.login = false;
    res.locals.pass = false;
    return next('Input valid username and password');
  }

  try {
    // create user in database
    const dbRes = await User.create({ username, password });
    console.log(`createUser DB Response ${dbRes}`);
    res.locals.login = true;
    res.locals.pass = true;
    res.locals.currentUser = username;
  } catch (err) {
    res.locals.login = false;
    res.locals.pass = false;
    return next(err);
  }

  // if successful, redirect
  // if error, invoke global error handler
  return next();
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = async (req, res, next) => {
  // write code here
  console.log(req.body);
  // req.body. username && password
  // if user and password exists ?
  const username = req.body.username;
  const password = req.body.password;
  try {
    const dbRes = await User.find({ username: username });
    console.log(dbRes);
    // dbRes = [ { usernamer: 'user3', password: 'pass'} ]
    // dbRes = [];

    // Case 1: User doesn't exist in DB: dbRes.length !== 1
    if (dbRes.length !== 1) {
      res.locals.login = false;
      return next();
    }
    // Case 2: Passwords don't match: dbRes[0].password === password
    // If either of the above are true, persist data we can use to have the router redirect them, then call next();
    if (dbRes[0].password !== password) {
      res.locals.pass = false;
      return next();
    }
    res.locals.login = true;
    res.locals.pass = true;
  } catch (err) {
    return next(err);
  }

  // if user and password !exists => redirect to sign up
  res.locals.currentUser = username;
  return next();
};

module.exports = userController;
