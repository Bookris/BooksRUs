const { Session, User } = require('../model/schema');
const userController = require('./userController.js')
const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = async (req, res, next) => {
  // write code here
  console.log("COOKIE: ", req.cookies)
  const {ssid} = req.cookies
  const session = await Session.findOne({cookieId: ssid})
  // console.log("session id: ", session.cookieId);
  // console.log("ssid: ", ssid)
  if (!session) {
    res.locals.session = false;
    return next();
  } else if (session.cookieId == ssid) {
    //findOne User and return that user object
    const user = await User.findOne({_id: ssid})
    console.log('USER: ', user);
    res.locals.session = user;
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

sessionController.endSession = async (req, res, next) => {
  console.log("ENDING SESSION")
  try {
    // get SSID from req cookie
    const {ssid} = req.cookies

    // create Session with SSID
    // const dbRes = await User.create({ username, password });
    const dbRes = await Session.deleteOne({ cookieId: ssid });
    console.log(`deleteSession() DB Response ${dbRes}`);
    res.locals.deleted = false;
    if (dbRes.deletedCount >= 1) res.locals.deleted = true;
  } catch (err) {
    console.log(`deleteSession() ERROR: ${err}`);
  }

  return next();
}

module.exports = sessionController;
