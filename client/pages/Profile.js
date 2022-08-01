import * as React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ProfileBooks from '../components/booksForProfile';


export default function Profile() {
  const user = useStoreState((state) => state.user);
  const logoutUser = useStoreActions((actions) => actions.logout);
  let navigate = useNavigate();
  const likedBooks = user.likedBooks;
  const likedBooksComponents = []
  for (let i = 0; i < likedBooks.length; i++) {
    const currentBook = likedBooks[i];
    likedBooksComponents.push(<ProfileBooks book={currentBook} key={i} />);
  }
  return (

    <div className='user-profile'>

      <button className='searchbtn_profile' onClick={() => navigate("/search", { replace: true })}> Search</button>


      <div>
        <div class="card text-center">
          <div class="card-body">
            <h3 class="card-title">User Profile</h3>
            <p class="card-text">User: {user.username}</p>
            <p class="card-text">Email: {user.email}</p>
          </div>
        </div>
      </div>




      <div className='favorite_books'>
        <div class="card text-center">
          <div class="card-body">
            <h3 class="card-title">My Favorite Books</h3>
            <p class="card-text">View all your favorite books in one place!</p>
            {likedBooksComponents}
          </div>
        </div>
      </div>


    </div >




  )
} 

