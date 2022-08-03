import * as React from 'react';
import Comment from './Comments'
import { useStoreState, useStoreActions } from 'easy-peasy';
export default function Book(props) {

  //import user from store
  //fetch req to /like. body should be email and bookdata {name, description,isbn,imgUrl, moreInfo}. probably need to refactor post('/like ) to fit w frontend  
  const user = useStoreState((state) => state.user);
  const updateUser = useStoreActions((actions) => actions.updateUser);
  const likedBooks = useStoreState((state) => state.user.likedBooks)
  const updateLikedBooks = useStoreActions((actions) => actions.updateLikedBooks);
  const imageUrl = props.book.volumeInfo.imageLinks ? Object.values(props.book.volumeInfo.imageLinks)[0] : "not found";
  const isbn = props.book.volumeInfo.industryIdentifiers[1] ? props.book.volumeInfo.industryIdentifiers[1].identifier : props.book.volumeInfo.industryIdentifiers[0].identifier
  const isbn_type = props.book.volumeInfo.industryIdentifiers[1] ? props.book.volumeInfo.industryIdentifiers[1].type : props.book.volumeInfo.industryIdentifiers[0].type
  const bookData = {
    name: props.book.volumeInfo.title,
    description: props.book.volumeInfo.description,
    isbn: isbn, // props.book.volumeInfo.industryIdentifiers[1].identifier,
    imageUrl: imageUrl,
    //moreInfo: props.book.volumeInfo.infoLink
  }

  async function handleLike(event) {
    // console.log('user????', user);

    const sendingInfo = { email: user.email, bookData: bookData };
    console.log('sending info: ',sendingInfo);
    const result = await fetch('/books/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendingInfo)
    })
      .then((data) => data.json())
      .then((data) => {
        console.log('returned data ',data);
        if (data.length > 0) {
          updateLikedBooks(data);
        }
        console.log('liked books ',likedBooks);
      }/*updateUser(data)*/)
      // .then((data) => updateUser(data))
      .catch(err => console.log('error in /books/like'))

  }

  return (
    <div>
      <h4>Book Name: {bookData.name} </h4>
      <img  src={bookData.imageUrl} />
      <h4>{isbn_type}: {bookData.isbn}</h4>

      <h4>Description: {bookData.description}</h4>
      <a href={bookData.moreInfo}>More Info</a>
      <button onClick={handleLike}> Like</button>
      <br></br>

    </div >
  )
}
