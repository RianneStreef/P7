import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function Login() {
  const [userDetails, setUserDetails] = useState({
    email: 'riannestreef@gmail.com',
    password: 'Hallo',
  });

  const { email, password } = userDetails;

  const [showPassword, setShowPassword] = useState(false);

  function displayPassword() {
    setShowPassword(!showPassword);
  }

  const handleInput = (event) => {
    setUserDetails((prevState) => {
      const loginDetails = {
        ...prevState,
        [event.target.name]: event.target.value,
      };
      return loginDetails;
    });
  };

  const handleSubmit = async (event) => {
    console.log('sending login details');
    console.log(userDetails);
    event.preventDefault();
    try {
      console.log(userDetails.email);
      const res = await axios.put(
        `http://localhost:3001/api/auth/`,
        userDetails
      );
      console.log(res);
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
        <div className="password-button">
          <div className="form-group">
            <label htmlFor="password">
              <input
                placeholder="password"
                type="text"
                id="password"
                name="password"
                className={`${!showPassword ? 'password' : 'password-input'}`}
                value={password}
                onChange={handleInput}
              />
            </label>
          </div>
          <button
            className="eye-button"
            type="button"
            onClick={displayPassword}
          >
            {!showPassword ? (
              <i className="fas fa-eye" />
            ) : (
              <i className="fas fa-eye-slash" />
            )}
          </button>
        </div>
        <div className="button-container">
          <button className="text-button" type="submit">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
