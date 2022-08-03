const oauthController = {};

oauthController.setJWT = (req, res, next) => {
  try {
    // // req.body is expected to be the JWT
    // const accessToken = req.body;
    // res.locals.accessToken = accessToken; // might not need this
    // console.log("setting cookie")
    // res.cookie('googleAuth', accessToken)
    // console.log("cookie: ", res.cookie);

    // use session ID?

    // store into session model
    // also need cookie id?

    // or use another JWT var?
    console.log ("setting JWT")
    //decoded user info
    res.locals.userObject = req.body.userObject;
    return next();
  }
  catch (err) {
    console.log("JWT ERROR: ", err);
    next(err);
  }
}

module.exports = oauthController;