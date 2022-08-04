const path = require('path');
const express = require('express');
const authRouter = require('./routers/authRouter.js');
const bookRouter = require('./routers/bookRouter.js');
const oauthRouter = require('./routers/oauthRouter.js');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 3000;
const sessionController = require('./controllers/sessionController.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//test server can work
// app.get('/test', (req, res) => res.send("i am okayyyyyyy'"))

// load all assets
app.use(express.static(path.join(__dirname, '../client/assets')));

// app.get('/', (req, res) => {
//   res.render('hi');
// });

// router: /oauth
app.use('/oauth', oauthRouter);

// // router: /login /logup /logout /reset
// app.use('/auth', authRouter);

// router: /search, /myshelf,
app.use('/books', bookRouter);

app.use('/test', (req, res) => {
  console.log('AAAAAAAAAAAA');
  res.redirect('/search');
})

app.use('/authorized', sessionController.isLoggedIn, (req, res) => {
  // if (res.locals.session) {
  //   // render profile page
  //   console.log('I AM FROM THE /authorized GET REQUEST', res.locals.session)
  //   // res.render('../client/pages/Profile')
  //   res.redirect('/profile')
  //   // res.status(200).json({authorized: true})
  // } else {
  //   res.redirect('/')
  //   // res.status(200).json({authorized: false})
  // }
  console.log('I AM RES',res.locals.session)
  return res.status(200).json(res.locals.session);
});

app.use('/deauthorized', sessionController.endSession, (req, res) => {
  console.log("DEAUTHORIZED!!")
  return res.status(200).json(res.locals.deleted);
})

// non-existing page err handler
app.use((req, res) =>
  res.status(404).send("You are looking for a page that doesn't exist...")
);

app.use((err, req, res, next) => {
  // define an default err
  const defaultErr = {
    status: 400,
    message: { err: 'error occured' },
    log: 'unknown middleware error!',
  };
  // call Object.Assign, for the user defined middleware err to overwrite our default err
  const errorObject = Object.assign({}, defaultErr, err); // { message: { err: 'user registered err' } }
  // console.log err
  console.log(errorObject.log);
  // return to the user directly, not next()
  return res.status(errorObject.status).json(errorObject.message);
});

// server message
app.listen(3000, () => {
  console.log(`Server listening on port: 3000`);
});
