import React, { Component, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Auth from './Auth';
import jwt_decode from 'jwt-decode';
import { useStoreState, useStoreActions } from 'easy-peasy';

function App() {
  // Easy-Peasy state V
  // const userName = useStoreState((state) => state.user);
  const updateUser = useStoreActions((actions) => actions.updateUser);
  // we will need to store this in our global state -- @johnny can use easy-peasy here
  const [user, setUser] = useState({});
  let navigate = useNavigate();

  // let navigate = useNavigate() react hook
  function handleCallbackResponse(response) {
    console.log('encoded JWT ID token' + response.credential);
    // look to potentially save response.credential in order to track logged in user

    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    // setUser(userObject);
    updateUser(userObject);
    navigate('/profile', { replace: true });
    document.getElementById('signInDiv').hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        '450531637260-o90comuborlhp8678tl3s34bhdhj1307.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);
  // no user: show sign in button
  // user: show log out button
  return (
    <div>
      <h1> App Page</h1>
      <div id='signInDiv'></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {/* {user && <Navigate to='/profile' replace={false} />} */}
      {/* <Navigate to='/auth' replace={true} /> */}
    </div>
  );
}

export default App;

// <div>
//   <img src={user.picture}></img>
//   <h3>{user.name}</h3>
// </div>
