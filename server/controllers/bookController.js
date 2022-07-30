const { User, Comment, Book } = require('../model/schema');

const bookController = {};

//req.body include email and isbn
bookController.like = async (req, res, next) => {
  // get the req body of book isbn identifier
  const { email, bookData } = req.body;
  console.log("!!!", email, bookData)
  // query db of user likedBooks property for this book: add to it or not add to it if exists
  await User.findOne({ email: email })
    .then(user => {
      const arrOfBooks = user.likedBooks;
      for (const book of arrOfBooks) {
        // check book.isbn, if find, return
        if (book.isbn === bookData.isbn) {
          console.log('book is already liked');
          //res.locals.data = user; // $$$ frontend needs to know this
          return next();
        }
      }
      //adding instance of book
      async function helper() {
        const likedBook = await Book.create({ name: bookData.name, description: bookData.description, isbn: bookData.isbn, imageUrl: bookData.imageUrl, moreInfo: bookData.moreInfo });
        User.updateOne({ email: email }, { $push: { likedBooks: likedBook } })
          .then((doc) => { console.log('!!!', doc) })
          .catch((err) => { console.log('update user likedbook err!!!') })
      };
      helper()
      return next();
    })
}

bookController.unLike = async (req, res, next) => {

}



module.exports = bookController;