import * as React from 'react';
import Comment from './Comments'
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function ProfileBooks(props) {
  return (
    <div>
      <h4>Book Name: {props.book.name} </h4>
      <img src={props.book.imageUrl} />
      <h4>ISBN-10: {props.book.isbn}</h4>

      <h4>Description: {props.book.description}</h4>
      <a href={props.book.moreInfo}>More Info</a>

      <br></br>

    </div >
  )
}