import React, { Component, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Outlet, Link, Navigate } from 'react-router-dom';
import Auth from './Auth';

class App extends Component {

  // let navigate = useNavigate() react hook 
  render() {
    return (
      <div>
        <h1> App Page</h1>
        <Navigate to="/auth" replace={true} />

      </div>
    )
  }
}

export default App;