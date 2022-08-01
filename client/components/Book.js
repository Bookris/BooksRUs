import * as React from 'react';
import Comment from './Comments'
class Book extends React.Component {
  constructor(props){
    super(props)

  }
  render() {
  //   const comments = this.props.book.comments;
  //   const commentsComponents = [];
  //   for(let i = 0; i< comments.length; i++){
  //   const currentComment = comments[i];
  //   commentsComponents.push(<Comment comment={currentComment}/>);
  // }
    return (
      <div>
        <h4>Book Name: {this.props.book.name} </h4>
        <h4>ISBN: {this.props.book.isbn}</h4>
        {/* <h4>: </h4> */}
        <h4>Description: {this.props.book.description}</h4>
        <h4>MoreInfo: {this.props.book.moreInfo} </h4>
        <div>
          Comments:
          
          <div>
            {/* {commentsComponents} */}
          </div>
        </div>
      </div>
    )
  }
}
export default Book;