import * as React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
export default function () {
  const user = useStoreState((state) => state.user);
  const logoutUser = useStoreActions((actions) => actions.logout);
  let navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* <a className="navbar-brand">Navbar</a>
        <button onClick={() => {
          logoutUser(user);
          navigate("/auth/login", { replace: true });
        }}>Logout</button>
        <button onClick={() => navigate("/profile", { replace: true })}>Profile</button>
        <button onClick={() => navigate('/search', { replace: true })}>Search</button> */}
        {/* <div class="collapse navbar-collapse" id="navbarNav">
          <a onClick={() => {
            logoutUser(user);
            navigate("/auth/login", { replace: true });
          }}>Logout</a>
          <a onClick={() => navigate("/profile", { replace: true })}>Profile</a>
          <a onClick={() => navigate('/search', { replace: true })}>Search</a>
        </div> */}

        <a class="navbar-brand" href="#">Home</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">

            <li class="nav-item">
              <a class="nav-link active" aria-current="page" onClick={() => {
                logoutUser(user);
                navigate("/auth/login", { replace: true });
              }} >Login</a>

            </li>
            <li class="nav-item">
              <a class="nav-link" onClick={() => navigate("/profile", { replace: true })}>Profile</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" onClick={() => {
                logoutUser(user);
                navigate("/auth/login", { replace: true });
              }} >Logout</a>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}