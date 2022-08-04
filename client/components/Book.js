import * as React from 'react';
import Comment from './Comments';
import { useStoreState, useStoreActions } from 'easy-peasy';
export default function Book(props) {
  //import user from store
  //fetch req to /like. body should be email and bookdata {name, description,isbn,imgUrl, moreInfo}. probably need to refactor post('/like ) to fit w frontend
  const user = useStoreState((state) => state.user);
  const updateUser = useStoreActions((actions) => actions.updateUser);
  const likedBooks = useStoreState((state) => state.user.likedBooks);
  const updateLikedBooks = useStoreActions(
    (actions) => actions.updateLikedBooks
  );
  const imageUrl = props.book.volumeInfo.imageLinks
    ? Object.values(props.book.volumeInfo.imageLinks)[0]
    : 'Not found';
  const infoLink = props.book.volumeInfo ? props.book.volumeInfo : 'Not Found';
  let isbn;
  let isbn_type;
  if (props.book.volumeInfo.industryIdentifiers) {
    isbn = props.book.volumeInfo.industryIdentifiers[1]
      ? props.book.volumeInfo.industryIdentifiers[1].identifier
      : props.book.volumeInfo.industryIdentifiers[0].identifier;
    isbn_type = props.book.volumeInfo.industryIdentifiers[1]
      ? props.book.volumeInfo.industryIdentifiers[1].type
      : props.book.volumeInfo.industryIdentifiers[0].type;
  } else {
    isbn = 'Not Found';
    isbn_type = 'N/A';
  }
  console.log('props.book.volumeInfo.infoLink');
  // shortening description return string in search
  let descriptionStr
  if (!props.book.volumeInfo.description) {
    descriptionStr = ''
  } else {
    props.book.volumeInfo.description.length < 250 ? descriptionStr = props.book.volumeInfo.description : descriptionStr = props.book.volumeInfo.description.substring(0, 250);
  }

  const bookData = {
    name: props.book.volumeInfo.title,
    description: descriptionStr,
    isbn: isbn, // props.book.volumeInfo.industryIdentifiers[1].identifier,
    imageUrl: imageUrl,
    moreInfo: props.book.volumeInfo.infoLink,
  };

  async function handleLike(event) {
    // console.log('user????', user);

    const sendingInfo = { email: user.email, bookData: bookData };
    console.log('sending info: ', sendingInfo);
    const result = await fetch('/books/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendingInfo),
    })
      .then((data) => data.json())
      .then(
        (data) => {
          console.log('returned data ', data);
          if (data.length > 0) {
            updateLikedBooks(data);
          }
          console.log('liked books ', likedBooks);
        } /*updateUser(data)*/
      )
      // .then((data) => updateUser(data))
      .catch((err) => console.log('error in /books/like'));
  }

  return (
    <div className='IndividualBook'>
      <h4>Book Name: {bookData.name} </h4>
      <img src={bookData.imageUrl} />
      <h4>
        {isbn_type}: {bookData.isbn}
      </h4>

      <h4>
        Description: {descriptionStr}...
        <a href={bookData.moreInfo}>More Info</a>
      </h4>

      <button onClick={handleLike}> Like</button>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
