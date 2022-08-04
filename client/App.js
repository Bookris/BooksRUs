import React, { Component, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Auth from './Auth';
import jwt_decode from 'jwt-decode';
import { useStoreState, useStoreActions } from 'easy-peasy';
import './assets/styles.scss'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function App() {
  // Easy-Peasy state V
  // const userName = useStoreState((state) => state.user);
  const updateUser = useStoreActions((actions) => actions.updateUser);
  // we will need to store this in our global state -- @johnny can use easy-peasy here
  const [user, setUser] = useState({});
  let navigate = useNavigate();
  // let navigate = useNavigate() react hook
  async function handleCallbackResponse(response) {
    console.log('encoded JWT ID token' + response.credential);
    // look to potentially save response.credential in order to track logged in user

    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    // setUser(userObject);
   
    document.getElementById('signInDiv').hidden = true;

    // make a fetch request to server
    const user = await fetch('/oauth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userObject) // JSON.stringify(response.credential) // send whole response to server
    })
    const obj = await user.json();
    console.log("post response json: ",  obj)
    if (user.status === 200) {
      updateUser(obj); // call this after server responds back
      navigate('/profile', { replace: true });
    }
   
    // navigate('/profile', { replace: true });
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
    <div className='centered login '>
      <div>
        <h1 className='app-header' style={{ marginTop: '1em' }}>
          {' '}
          Books-R-US
        </h1>
      </div>

      <div className='centered  passwordbox'>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>
          <Button variant='primary' type='submit' className='submit--btn'>
            Submit
          </Button>

          <div className='centered' style={{ marginBottom: '.7em' }}>
            Sign in with Google
          </div>

         <div className='centered'> 
          <div style = {{marginBottom:'.7em'}}id='signInDiv'></div> 

            {/*Object.keys(user).length !== 0 && (
              <button onClick={(e) => handleSignOut(e)}>Sign Out</button> */}
            
          </div> 
        </Form>
 

       {/* <Navigate to='/auth' replace={true} /> */}

       </div> 
    </div>
  );
}

export default App;

{/* // <div>
//   <img src={user.picture}></img>
//   <h3>{user.name}</h3>
// </div> */}
