const { Session } = require('../model/schema');
const userController = require('./userController.js')
const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = async (req, res, next) => {
  // write code here
  
  const {ssid} = req.cookies
  const session = await Session.findOne({cookieId: ssid})
  console.log(session);
  if (!session) {
    res.locals.session = false;
    return next();
  } else if (session.cookieId === ssid) {
    res.locals.session = true;
    return next();
  } else {
    res.locals.session = false;
    return next();
  }
  
  // if(session) userController.login()
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = async (req, res, next) => {
  //write code here

  try {
    // if user not logged in, do nothing
    if (res.locals.login !== true || res.locals.pass !== true) {
      return next();
    }

    // get SSID from req cookie
    const ssid = res.locals.ssid;

    // create Session with SSID
    // const dbRes = await User.create({ username, password });
    const dbRes = await Session.create({ cookieId: ssid });
    console.log(`startSession() DB Response ${dbRes}`);

  } catch (err) {
    console.log(`startSession() ERROR: ${err}`);
  }

  return next();
};

module.exports = sessionController;
