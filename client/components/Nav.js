import * as React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
export default function () {
  const user = useStoreState((state) => state.user);
  const logoutUser = useStoreActions((actions) => actions.logout);
  const updateUser = useStoreActions((actions) => actions.updateUser);
  const isLogged = useStoreState(state => state.isLogged);
  let navigate = useNavigate();
  let userButton;

 
  const onLogoutClick = async() => {
    logoutUser(user);
    console.log("about to logout")
    const data = await fetch('/deauthorized', {
      method: 'DELETE'
    })
    console.log("data: ", data)
    const json = await data.json()
    console.log("JSON: ", json);
    if (json) {
      updateUser({
        username: '',
        email: '',
        picture: ''
      });
    } 
    navigate('/', { replace: true });
  }

  if (!isLogged) {
    userButton = <li className='nav-item'>
    <a
      className='nav-link active'
      aria-current='page'
      onClick={() => {
        // logoutUser(user);
        navigate('/', { replace: true });
      }}
    >
      Login
    </a>
  </li>
  } else {
    userButton = <li className='nav-item'>
    <a
      className='nav-link'
      onClick={onLogoutClick}
    >
      Logout
    </a>
  </li>
  }
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <a
          className='navbar-brand'
          onClick={() => navigate('/profile', { replace: true })}
        >
          Home
        </a>

        {/* <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button> */}
        <div
          className='collapse navbar-collapse'
          id='navbarNav'
          style={{ color: '#BABDCF !important;' }}
        >
          <ul className='navbar-nav'>
            {userButton}

            <li className='nav-item'>
              <a
                className='nav-link'
                onClick={() => {
                  if (isLogged) {
                    navigate('/search');
                  }
                }}
              >
                Search
              </a>
            </li>

            <li className='nav-item'>
              <a
                className='nav-link'
                onClick={() => {
                  if (isLogged) {
                    navigate('/cart');
                  }
                }}
              >
                <span class='material-symbols-outlined'>shopping_cart</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
