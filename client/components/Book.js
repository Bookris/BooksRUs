import * as React from 'react';
import Comment from './Comments'
import { useStoreState, useStoreActions } from 'easy-peasy';
class Book extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    // const comments = this.props.book.comments;
    // const commentsComponents = [];
    // for (let i = 0; i < comments.length; i++) {
    //   const currentComment = comments[i];
    //   commentsComponents.push(<Comment comment={currentComment} />);
    // }

    //import user from store
    //fetch req to /like. body should be email and bookdata {name, description,isbn,imgUrl, moreInfo}. probably need to refactor post('/like ) to fit w frontend  
    const user = useStoreState((state) => state.user);
    const bookData = {
      name: this.props.book.volumeInfo.title,
      description: this.props.book.volumeInfo.description,
      isbn: this.props.book.volumeInfo.industryIdentifiers[1].identifier,
      imageUrl: Object.values(this.props.book.volumeInfo.imageLinks),
      moreInfo: this.props.book.volumeInfo.infoLink
    }

    const image = Object.values(this.props.book.volumeInfo.imageLinks);
    return (
      <div>
        <h4>Book Name: {bookData.name} </h4>
        <img src={bookData.imageUrl} />
        <h4>ISBN-10: {bookData.isbn}</h4>

        <h4>Description: {bookData.description}</h4>
        <a href={bookData.moreInfo}>More Info</a>
        <button> Like</button>
        <br></br>

        {/* <button onClick={(e) => queryComments(e.target.value)}> Comments</button>
        display old comments in our database associated with this book
        add comment to this book 
        <div> Comments:

          <div>
            {commentsComponents}
          </div>

        </div> */}
      </div >
    )
  }
}
export default Book;