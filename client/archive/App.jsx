import { useState } from 'react';
import React, { Component, Fragment } from 'react';
import {
  Route,
  Switch,
  Link,
  HashRouter,
} from 'react-router-dom';
import { loginPage } from './LoginPage';
import { feed } from './Feed.jsx';

const App = () => {
  return (
    <div className='App'>
      <h1>Testing Render</h1>
      <loginPage />
    </div>
  );
};
// <HashRouter>
//   <div className='routers'>
//     <nav>
//       <ul>
//         <Link className='newentry' to='/'>
//           Back to Home
//         </Link>
//       </ul>
//       <ul className='container'>
//         <span className='titlehead'>Running Journal</span>
//       </ul>
//       <ul>
//         <Link className='newentry' to='/newentry'>
//           New Entry
//         </Link>
//       </ul>
//     </nav>
//   </div>

// <div>
//   <Routes>
//     <Route path='/' component={loginPage} exact />
//     <Route path='/feed' component={Feed} />
//     {/* <Route path='/updateentry/:idasdf' component={UpdateEntry} /> */}
//     {/* <Route component={Error} /> */}
//   </Routes>
// </div>
// // </HashRouter>

export default App;
