import * as React from 'react';
import Comment from './Comments'
import { useStoreState, useStoreActions } from 'easy-peasy';
export default function Book(props) {

  //import user from store
  //fetch req to /like. body should be email and bookdata {name, description,isbn,imgUrl, moreInfo}. probably need to refactor post('/like ) to fit w frontend  
  const user = useStoreState((state) => state.user);
  const updateUser = useStoreActions((actions) => actions.updateUser);
  const likedBooks = useStoreState((state) => state.userLikedBooks);
  const updateLikedBooks = useStoreActions((actions) => actions.updateLikedBooks);
  const imageUrls = Object.values(props.book.volumeInfo.imageLinks);
  const bookData = {
    name: props.book.volumeInfo.title,
    description: props.book.volumeInfo.description,
    isbn: props.book.volumeInfo.industryIdentifiers[1].identifier,
    imageUrl: imageUrls[0],
    moreInfo: props.book.volumeInfo.infoLink
  }

  async function handleLike(event) {
    // console.log('user????', user);

    const sendingInfo = { email: user.email, bookData: bookData };
    const result = await fetch('/books/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendingInfo)
    })
      .then((data) => data.json())
      .then((data) => console.log(data)/*updateUser(data)*/)
      // .then((data) => updateUser(data))
      .catch(err => console.log('error in /books/like'))

  }


  return (
    <div>
      <h4>Book Name: {bookData.name} </h4>
      <img src={imageUrls[0]} />
      <h4>ISBN-10: {bookData.isbn}</h4>

      <h4>Description: {bookData.description}</h4>
      <a href={bookData.moreInfo}>More Info</a>
      <button onClick={handleLike}> Like</button>
      <br></br>

    </div >
  )
}
