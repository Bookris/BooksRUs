import * as React from 'react';
import Comment from './Comments'
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function ProfileBooks(props) {

  // function handleBookUnlike() {
  //   console.log("Unliking book: ", props.book.isbn) 

  //   const result = await fetch('/books/unlike', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       isbn: props.book.isbn,
  //       title: props.book.name,
  //     })
  //   })
  //     .then((data) => data.json())
  //     .then((data) => {
  //       console.log('returned data ',data);
  //       if (data.length > 0) {
  //         updateLikedBooks(data);
  //       }
  //       console.log('liked books ',likedBooks);
  //     }/*updateUser(data)*/)
  //     // .then((data) => updateUser(data))
  //     .catch(err => console.log('error in /books/like'))

  // }

  return (
    <div>
      <h4>Book Name: {props.book.name} </h4>
      <img src={props.book.imageUrl} />
      <h4>ISBN-10: {props.book.isbn}</h4>

      <h4>Description: {props.book.description}</h4>
      <a href={props.book.moreInfo}>More Info</a>
      {/* <button onClick={handleBookUnlike}>Remove</button> */}
      <br></br>

    </div >
  )
}