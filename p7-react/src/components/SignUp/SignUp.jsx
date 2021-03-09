import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';

function signUp() {
  const [signUpDetails, setSignUpDetails] = useState({
    email: 'riannestreef@gmail.com',
    password: 'hallo',
    first: 'Rianne',
    last: 'Streef',
  });

  const handleInput = (event) => {
    setSignUpDetails((prevState) => {
      const inputDetails = {
        ...prevState,
        [event.target.name]: event.target.value,
      };
      return inputDetails;
    });
  };

  const handleSubmit = (event) => {
    console.log('sending sign up details');

    event.preventDefault();
    try {
      axios.post('http://localhost:3001/api/auth/signup', signUpDetails);
    } catch (err) {
      console.error('Error submitting');
    }
  };

  const { email, password, first, last } = signUpDetails;

  return (
    <div className="sign-up card">
      <h1>Sign Up</h1>
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
        <div className="form-group">
          <label htmlFor="first">
            <input
              placeholder="first name"
              type="text"
              id="first"
              name="first"
              value={first}
              onChange={handleInput}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="last">
            <input
              placeholder="last name"
              type="text"
              id="last"
              name="last"
              value={last}
              onChange={handleInput}
            />
          </label>
        </div>

        <div className="button-container">
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}

export default signUp;
