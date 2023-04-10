import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const { user: sessionUser } = useSelector(state => state.session);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(sessionActions.login({ credential, password }));
    } catch (res) {
      let data;
      try {
        data = await res.json();
      } catch {
        data = await res.text();
      }
      setErrors(data?.errors ?? [data ?? res.statusText]);
    }
  };

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <div id="signInBackground">
      <div className="fontFamily" id="signInPage">
        <form className="signInForm" onSubmit={handleSubmit}>
          <ul>{errors.map(error => <li key={error}>{error}</li>)}</ul>
          <h1 id="signIn">Sign in</h1>
          <p id="signInDescription">Stay updated on your professional world</p>
          <input
            type="text"
            value={credential}
            placeholder="Email or Phone"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <NavLink to="/forgot" className="forgotSignup">
            Forgot Password?
          </NavLink>
          <button type="submit" className="signInSubmit">
            Sign in
          </button>
        </form>
        <div id="newTo">
          New to LinkedIn?{' '}
          <NavLink to="/signup" className="forgotSignup" id="signUpIn">
            Join now
          </NavLink>{' '}
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
