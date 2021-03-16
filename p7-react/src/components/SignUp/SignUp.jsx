import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

function signUp(props) {
  const { isLoggedIn, setLoggedIn, currentUser, setCurrentUser } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState('');

  const [signUpDetails, setSignUpDetails] = useState({
    email: 'riannestreef@gmail.com',
    password: 'hallo',
    firstName: 'Rianne',
    lastName: 'Streef',
    articlesRead: [],
  });

  const { email, password, firstName, lastName } = signUpDetails;

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
    setError('');
    setIsLoading(true);

    event.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3001/api/auth/signup',
        signUpDetails
      );
      setIsLoading(false);
      setLoggedIn(true);

      console.log(res);

      console.log(res.data.user);
      setCurrentUser(res.data.user);
      console.log(currentUser);
    } catch (err) {
      if (err?.response && err?.response?.data?.message) {
        console.log(err?.response?.data?.message);
        setError(err.response.data.message);
      } else {
        setError('Unknown error occurred');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-up card">
      {isError && <div className="err">{isError}</div>}
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
