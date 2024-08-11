// src/components/UI/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import classes from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const authCtx = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = new URLSearchParams(location.search).get('redirectPath') || '/';

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await authCtx.login(email, password, redirectPath);
    } catch (error) {
      setError('Incorrect email or password.');
    }
  };

  return (
    <div className={classes.login}>
      <h2>Login</h2>
      {error && <p className={classes.error}>{error}</p>}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={classes.actions}>
          <button className={classes.loginButton} type="submit">Login</button>
        </div>
      </form>
      <Link to={`/signup?redirectPath=${redirectPath}`} className={classes.signupLink}>New user? Sign up here!</Link>
    </div>
  );
};

export default LoginPage;
