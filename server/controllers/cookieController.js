const { User } = require('../model/schema');

const cookieController = {};

/**
 * setCookie - set a cookie with a random number
 */
cookieController.logRequestCookies = (req, res, next) => {
  console.log(`logRequestCookies(): ${JSON.stringify(req.cookies)}`);
  return next();
};

cookieController.setCookie = (req, res, next) => {
  // create cookie label 'codesmith' with val = 'hi'
  // attach cookie to express response
  //   res.cookie('username', 'philip');
  res.cookie('codesmith', 'hi');
  const randNum = Math.floor(Math.random() * 99);
  res.cookie('secret', randNum);
  console.log('setCookie(): ', res.get('Set-Cookie'));
  return next();
};

/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = async (req, res, next) => {
  try {
    // if user not logged in, do nothing
    if (res.locals.login !== true || res.locals.pass !== true || res.locals.ssid) {
      return next();
    }

    // get username from res.locals.currentUser
    const username = res.locals.userObject.name;
    // get _id for user from DB, store as userId;
    const dbQuery = { username: username };
    console.log(`setSSIDCookie() mongoose query: ${JSON.stringify(dbQuery)}`);
    const dbRes = await User.find(dbQuery);
    console.log('setSSIDCookie() mongoose response: ');
    console.log(dbRes);
    // Check if user doesn't exist in DB: dbRes.length !== 1
    if (dbRes.length !== 1) {
      return next(`username '${username} not uniquely found in database`);
    }
    // res.cookie('ssid', userId);
    console.log(`setSSIDCookie() mongoose response: _id = ${dbRes[0]._id}`);
    res.cookie('ssid', dbRes[0]._id, {
      httpOnly: true,
    });
    
    res.locals.ssid = dbRes[0]._id;

  } catch (err) {
    return next(err);
  }

  return next();
};

module.exports = cookieController;
