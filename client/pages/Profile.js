import * as React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Book from '../components/Book';
export default function Profile() {
  const user = useStoreState((state) => state.user);
  const logoutUser = useStoreActions((actions) => actions.logout);
  let navigate = useNavigate();
  const likedBooks = user.likedBooks;
  const likedBookComponents = []
  for (let i = 0; i < likedBooks.length; i++) {
    const currentBook = likedBooks[i];
    likedBooksComponents.push(<Book book={currentBook} />);
  }
  return (
    <div>
      <h1>Profile</h1>
      <h3>User: {user.username}</h3>
      <h3>Email: {user.email}</h3>
      <button onClick={() => {
        logoutUser(user);
        navigate("/auth/login", { replace: true });
      }}>Logout</button>
      <button onClick={() => navigate("/search", { replace: true })}> Search</button>
      <h2>--Liked Books--</h2>
      <div>
        {'where book components will be located'}
        {likedBookComponents}
      </div>


    </div>
  )
} 