import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function Login() {
  const [userDetails, setUserDetails] = useState({
    email: 'riannestreef@gmail.com',
    password: 'Hallo',
  });

  const { email, password } = userDetails;

  const handleInput = (event) => {
    setUserDetails((prevState) => {
      const loginDetails = {
        ...prevState,
        [event.target.name]: event.target.value,
      };
      return loginDetails;
    });
  };

  const handleSubmit = (event) => {
    console.log('sending login details');
    event.preventDefault();
    try {
      axios.post('http://localhost:3001/api/auth/login', userDetails);
    } catch (err) {
      console.error('Error logging in');
    }
  };

  return (
    <div className="login card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">
            <input
              placeholder="email"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInput}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <input
              placeholder="password"
              type="text"
              id="password"
              name="password"
              value={password}
              onChange={handleInput}
            />
          </label>
        </div>
        <div className="button-container">
          <button className="button" type="submit">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
