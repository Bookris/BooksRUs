const path = require('path');
const express = require('express');
const authRouter = require('./routers/authRouter.js');
const bookRouter = require('./routers/bookRouter.js');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//test server can work
// app.get('/test', (req, res) => res.send("i am okayyyyyyy'"))

// load all assets
app.use(express.static(path.join(__dirname, '../client/assets')));

app.get('/', (req, res) => {
  res.render('hi');
});

// router: /login /logup /logout /reset
app.use('/auth', authRouter);

// router: /search, /myshelf,
app.use('/books', bookRouter);

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
  // console.log(errorObject.log);
  // return to the user directly, not next()
  return res.status(errorObject.status).json(errorObject.message);
});

// server message
app.listen(3000, () => {
  console.log(`Server listening on port: 3000`);
});
