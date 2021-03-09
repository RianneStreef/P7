import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

function signUp(props) {
  const { setLoggedIn } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const [signUpDetails, setSignUpDetails] = useState({
    email: 'riannestreef@gmail.com',
    password: 'hallo',
    firstName: 'Rianne',
    lastName: 'Streef',
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

  const handleSubmit = async (event) => {
    setIsError('');
    setIsLoading(true);
    console.log('sending sign up details');

    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/auth/signup', signUpDetails);
      setIsLoading(false);
      // At this stage, you can set user to logged in
      setLoggedIn(true);
    } catch (err) {
      if (err.response.status === 400) {
        // err.response.data.message;
        setIsError('Email is already taken');
      }
      setIsLoading(false);
    }
  };

  const { email, password, firstName, lastName } = signUpDetails;

  return (
    <div className="sign-up card">
      {isError && <div>{isError}</div>}
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
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
              <label htmlFor="firstName">
                <input
                  placeholder="first name"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleInput}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="last">
                <input
                  placeholder="last name"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleInput}
                />
              </label>
            </div>

            <div className="button-container">
              <button type="submit">Sign up</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default signUp;
