import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './store';
import { StoreProvider } from 'easy-peasy';
import App from './App';
import Auth from './Auth';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Search from './pages/Search';
import './assets/styles.scss';
const rootElement = document.getElementById('root');
import Nav from './components/Nav';
import { useStoreState, useStoreActions } from 'easy-peasy';

// const label = useStoreState((state) => state.label);

render(
  <StoreProvider store={store}>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<App />} />

        <Route path='/auth' element={<Auth />}>
          <Route path='login' element={<Login />} /> // The nested url segments
          map to nested component trees.
          <Route path='register' element={<Register />} />
        </Route>

        <Route path='/profile' element={<Profile />} />
        <Route exact path='/search' element={<Search />} />

        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
        <Route path='/books' />
      </Routes>
    </BrowserRouter>
  </StoreProvider>,
  rootElement // the big container
);
