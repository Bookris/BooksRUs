import React, { Component, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Outlet, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'
class Auth extends Component {
  render() {
    return (
      <div>
        <h1> BooksRUs </h1>
        <nav>
          <Link to='login'>Login Page</Link>
          <Link to='register'>Register Page</Link>
        </nav>
        <Outlet />
      </div>
    )
  }
}



export default Auth;