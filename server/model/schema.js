const mongoose = require('mongoose');
const { schema } = require("webpack-dev-server");
const {password} = require('../secrets')
const MONGO_URI = `mongodb+srv://username:${password}@booksrus-2.zrev2wj.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'cluster0'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const commentsSchema = new mongoose.Schema({ // username, time, comment
  username: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  comment: {
    type: String,
    required: true
  },

});
const Comment = mongoose.model('Comments', commentsSchema);

const bookSchema = new mongoose.Schema({ // name, desc, isbn, imageUrl, moreInfo
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  isbn: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
  },
  moreInfo: {
    type: String,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]

})
const Book = mongoose.model('Books', bookSchema);

const userSchema = new mongoose.Schema({  // username, password, friends, comments, likedBooks
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    // required: true
  },
  picture: {
    type: String,
  },
  friends: [],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
  likedBooks: [{
    type: Schema.Types.ObjectId,
    ref: 'book'
  }]

})
/* Creating a model for the Users collection. */
const User = mongoose.model('Users', userSchema)


//Creating a model for sessions ID


const sessionSchema = new Schema({
  cookieId: { type: Schema.Types.ObjectId, required: true, unique: true },
  createdAt: { type: Date, expires: '168h', default: Date.now }
});

const Session = mongoose.model('Sessions', sessionSchema);
/* Exporting the Users, Comments, and Books models to be used in other files. */
module.exports = { User, Comment, Book, Session };