import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import '/client/assets/styles.scss';

export default function Login() {
  const user = useStoreState((state) => state.user);
  const updateUser = useStoreActions((actions) => actions.updateUser);

  let navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    // request to /auth/login
    const data = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log('error in /auth/login'));

    if (data === null) {
      //tell user that login credentials were wrong
      console.log('invalid credentials');
    } else {
      updateUser(data); //updates our global state
      navigate('/profile', { replace: true }); //navigates to profile if login was successful
    }
  }

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className='wrapper'>
      <div className='header'>
        <div className='top'>
          <h1 className='top_form'>Let's Get Started!</h1>

          <div className='form'>
            <form className='login-form' onSubmit={handleSubmit}>
              <div className='input_field'>
                <label htmlFor='email'>Email</label>

                <div className='input_box'></div>
                <input
                  id=' email'
                  placeholder='email@example.com'
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>

              <br></br>
              <div className='input_field'>
                <label for='password'>Password</label>

                <div className='input_box'>
                  <input
                    className='input_box'
                    type='password'
                    id='password'
                    placeholder='Password'
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></input>
                </div>
              </div>

              <br></br>

              <div className='btn'>
                <button className='btn' type='submit'>
                  Log In
                </button>
              </div>
            </form>
          </div>
          {/* top div tag ends below */}
        </div>
      </div>

      {/* ending div tag for whole page */}
    </div>
  );
}
