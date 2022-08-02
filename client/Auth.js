import React, { Component, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Outlet, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'
import Nav from './components/Nav.js'

class Auth extends Component {
  render() {
    return (
      <div>
        {/* 
        <h1 className='authHeader'> BooksRUs </h1>
        <nav className='authHeader'>
          <Link to='login'>Login</Link>
          <br></br>
          <Link to='register'>Register</Link>
        </nav> */}
        <div >
          <div className="jumbotron" >
            <div className='homeinfo'>
              <h1 className="display-4">BooksRUs</h1>
              <p className="lead">Build a library of your own!</p>
              <br></br>
              <p>Search and discover new books catered to your personal taste. Register now to start.</p>
            </div>
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="/#/auth/register" role="button">Register</a>
            </p>

            {/* <img src='cat.jpg' alt='cat' class="img-thumbnail"></img> */}

          </div>

        </div>

        <Outlet />
      </div>
    )
  }
}



export default Auth;