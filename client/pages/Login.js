import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';


export default function Login() {

  let navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    navigate("/profile", { replace: true });
  }
  const user = useStoreState((state) => state.book.user);
  const emailField = useStoreState((state) => state.book.emailField); //
  const updateEmailField = useStoreActions((actions) => actions.book.updateEmailField);
  const [value, setValue] = React.useState('');

  return (
    <div> <h1>Login</h1>
      <p>test!!!!!</p>
      {user}
      {emailField}
      <form>
        <p>Sign in to your account!</p>
        <div>
          <label htmlFor='email'>email</label>
          <input type="email" id='email' value={emailField} onChange={(e) => updateEmailField(e.target.value)}></input>

        </div>
        <br></br>
        <div>
          <label for='password'>password</label>
          <input type="password" id='password' ></input>
        </div>
        <br></br>
        <button type='submit' onClick={handleSubmit}>Login</button>


      </form>


    </div>




  )
}