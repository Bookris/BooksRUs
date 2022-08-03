import * as React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ProfileBooks from '../components/booksForProfile';
import store from '../store';

export default function Profile() {
  const user = useStoreState((state) => state.user);
  console.log(user);
  // const logoutUser = useStoreActions((actions) => actions.logout);
  let navigate = useNavigate();
  const likedBooks = user.likedBooks;
  console.log('user likedbooks: ', user.likedBooks);
  const likedBooksComponents = []
  for (let i = 0; i < likedBooks.length; i++) {
    const currentBook = likedBooks[i];
    likedBooksComponents.push(<ProfileBooks book={currentBook} key={i} />);
  }
  return (
    <div className='user-profile'>
      <button
        className='searchbtn_profile'
        onClick={() => navigate('/search', { replace: true })}
      >
        {' '}
        Search
      </button>

      <div>
        <div className='card text-center'>
          <div className='card-body'>
            <h3 className='card-title'>User Profile</h3>
            <img className ="profile-image" src={user.picture}></img>
            <p className='card-text'>User: {user.name}</p>
            <p className='card-text'>Email: {user.email}</p>
          </div>
        </div>
      </div>

      <div className='favorite_books'>
        <div className='card text-center'>
          <div className='card-body'>
            <h3 className='card-title'>My Favorite Books</h3>
            <p className='card-text'>
              View all your favorite books in one place!
            </p>
            {likedBooksComponents}
          </div>
        </div>
      </div>
    </div>
  );
}
