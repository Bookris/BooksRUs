import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Auth from './Auth';
import Login from './pages/Login';
import Register from './pages/Register';
import './assets/styles.scss';
const rootElement = document.getElementById('root');

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<Login />} /> // The nested url segments map to nested component trees.
        <Route path="register" element={<Register />} />


      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
      {/* <Route path='/books'>
        <Route path='/profile' element={<Profile />} />
        <Route path='/search' element={<Search />} /> */}

    </Routes>
  </HashRouter>
  , rootElement
);  