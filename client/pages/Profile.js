import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function Profile() {
  const user = useStoreState((state) => state.user);
  return (
    <div>
      <h1>Profile</h1>
      <h3>User: {user.username}</h3>
      <h3>Email: {user.email}</h3>
      <h2>--Liked Books--</h2>
    </div>
  );
}
