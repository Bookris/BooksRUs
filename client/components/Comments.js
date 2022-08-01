import * as React from 'react';

class Comment extends Component {
    render(){
        return(
            <div>
                <div> user: {this.props.comment.username} </div>
                <div> date: {this.props.comment.time}</div>
                <div> comment:{this.props.comment.comment}</div>
            </div>
        )
    }
}

export default Comment;