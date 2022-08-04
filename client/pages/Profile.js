import * as React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ProfileBooks from '../components/booksForProfile';
import store from '../store';

export default function Profile() {
  let navigate = useNavigate();
  const [isLoaded, setLoaded] = React.useState(false);
  const isLogged = useStoreState((state) => state.isLogged);
  const setIsLogged = useStoreActions((actions) => actions.setIsLogged);
  const [books, setBooks] = React.useState([])
  const user = useStoreState((state) => state.user);
  const updateUser = useStoreActions((actions) => actions.updateUser);
  console.log('USER: ', user);


  React.useEffect(() => {
    if (!isLoaded) {
      fetch('/authorized')
      .then((data) => {
      return data.json()})
      .then(async (data) => {
        if (data) {
          setLoaded(true);
          setIsLogged(true);
          updateUser({
            username: data.username,
            email: data.email,
            likedBooks: data.likedBooks,
            picture: data.picture,
          });
          
        } else {
          console.log('USER NOT FOUND RETURNING', data);
          navigate('/')
        }
        return data.email
      }).then(data=> {
        if (data) {
        fetch('/books/allLiked', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data) {
              console.log('last .then data: ', data);
              setBooks(data);
            } else {
              console.log('USER NOT FOUND RETURNING', data);
              navigate('/');
            }
          });
        }
      })
    }   
  }, []);


       
     
 


  if (isLoaded) {
    console.log(user);
    // const logoutUser = useStoreActions((actions) => actions.logout);
    const likedBooks = books;
    console.log('user likedbooks: ',books);
    const likedBooksComponents = []
    for (let i = 0; i < likedBooks.length; i++) {
      const currentBook = likedBooks[i];
      likedBooksComponents.push(<ProfileBooks book={currentBook} key={i} />);
    }
    return (
      <div className='user-profile'>
       

        <div>
          <div className='card text-center'>
            <div className='card-body'>
              <h3 className='card-title'>User Profile</h3>
              <img className ="profile-image" src={user.picture}></img>
              <p className='card-text'>User: {user.username}</p>
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
  else {
    return (
      <div></div>
    )
  }
}
