// src/components/UI/SignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import classes from './SignUpPage.module.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const authCtx = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    await authCtx.signup(name, mobile, email, password, confirmPassword, '/');
  };

  return (
    <div className={classes.signup}>
      <h2>Sign Up</h2>
      {error && <p className={classes.error}>{error}</p>}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="mobile">Mobile Number</label>
          <input type="text" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div className={classes.actions}>
          <button className={classes.signUpButton} type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
