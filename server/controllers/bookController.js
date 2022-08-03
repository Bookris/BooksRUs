const { User, Comment, Book } = require('../model/schema');

const bookController = {};

//req.body include email and isbn
bookController.like = async (req, res, next) => {
  // get the req body of book isbn identifier
  const { email, bookData } = req.body;
  console.log("!!! request body", email, bookData)

  let book = await Book.findOne({ isbn: bookData.isbn });
  console.log('RESULT: ', book);

  if (!book) {
    book = await Book.create({ 
      name: bookData.name, 
      description: bookData.description, 
      isbn: bookData.isbn, 
      imageUrl: bookData.imageUrl, 
      moreInfo: bookData.moreInfo 
    });
  }

  await User.findOne({ email: email }).exec()
    .then(user => {
      const arrOfBooks = user.likedBooks;
      for (const bookElem of arrOfBooks) {
        // check book.isbn, if find, return
        if (bookElem === book.id) {
          console.log('book is already liked');
          res.locals.data = []; // $$$ frontend needs to know this
          return next();
        }
      }
      //adding instance of book
      async function helper() {
        // const likedBook = await Book.create({ name: bookData.name, description: bookData.description, isbn: bookData.isbn, imageUrl: bookData.imageUrl, moreInfo: bookData.moreInfo });
        const data = await User.updateOne({ email: email }, { $push: { likedBooks: book.id } }).exec()
          .then((doc) => { console.log(doc) }) // 
          .catch((err) => { console.log('update user likedbook err!!!') });

        const user = await User.findOne({ email: email });

        const result = await Book.find({ _id: { $in: user.likedBooks } });

        // console.log('res!!!', data.username);
        res.locals.data = result;
      };

      helper().then(() => next());
    })
    .catch((err) => next({ message: { err: 'err in booklike controller' } }));
}

bookController.unLike = async (req, res, next) => {
  // the book liked before
  //req body would be {email, bookData}
  const { email, isbn } = req.body
  await User.findOneAndUpdate({ email: email }, { $pull: { likedBooks: { isbn: isbn } } }, { new: true }).exec()
    .then(data => {
      res.locals.data = data;
    })
    .catch(err => next({ message: { err: 'err in removing book from likes' } }))
  // remvove the book from book collection
  // remove the 
  await Book.deleteOne({ isbn: isbn }).exec()
    .then((doc) => { console.log(doc); return next() })
    .catch((err) => next({ message: { err: 'err in delete on in Book' } }))


}



module.exports = bookController;