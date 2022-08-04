import * as React from 'react';
import Comment from './Comments';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function ProfileBooks(props) {
  // shortening description return string in search
  const descriptionStr = props.book.description.substring(0, 250);

  return (
    <div>
      <h4>Book Name: {props.book.name} </h4>
      <img src={props.book.imageUrl} />
      <h4>ISBN-10: {props.book.isbn}</h4>

      <h4>
        Description: {descriptionStr}...
        <a href={props.book.moreInfo}>More Info</a>
      </h4>

      <button>Remove</button>
      <br></br>
    </div>
  );
}
