import React, { useEffect, useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

function signUp(props) {
  const { isLoggedIn, setLoggedIn, currentUser, setCurrentUser } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState('');

  const [signUpDetails, setSignUpDetails] = useState({
    email: 'riannestreef@gmail.com',
    password: '',
    confirmPassword: '',
    firstName: 'Rianne',
    lastName: 'Streef',
    articlesRead: [],
  });

  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    articlesRead,
  } = signUpDetails;

  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  function displayPassword() {
    setShowPassword(!showPassword);
  }

  const handleInput = (event) => {
    setSignUpDetails((prevState) => {
      const inputDetails = {
        ...prevState,
        [event.target.name]: event.target.value,
      };
      return inputDetails;
    });
  };

  useEffect(() => {
    console.log('Signup details updated');
    if (signUpDetails.password === signUpDetails.confirmPassword) {
      console.log('passwords matching');
      setButtonDisabled(false);
    }
    if (signUpDetails.password !== signUpDetails.confirmPassword) {
      console.log('passwords not matching');
      setButtonDisabled(true);
    }
  }, [signUpDetails]);

  const handleSubmit = async (event) => {
    console.log('sending sign up details');
    setError('');
    setIsLoading(true);

    event.preventDefault();
    try {
      console.log(currentUser);
      const res = await axios.post(
        'http://localhost:3001/api/auth/signup',
        signUpDetails
      );
      setIsLoading(false);
      setLoggedIn(true);

      console.log(res);

      console.log(res.data.user);

      // info is here, but not setting current use
      // setCurrentUser(res.data.user);
      currentUser.email = res.data.user.email;
      currentUser.id = res.data.user.id;
      currentUser.firstName = res.data.user.firstName;
      currentUser.lastName = res.data.user.lastName;
      currentUser.articlesRead = JSON.parse(res.data.user.articlesRead);
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
            <div className="password-button">
              <div className="form-group">
                <label htmlFor="password">
                  <input
                    placeholder="password"
                    type="text"
                    id="password"
                    name="password"
                    autoComplete="off"
                    className={`${
                      !showPassword ? 'password' : 'password-input'
                    }`}
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
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <input
                  placeholder="confirm password"
                  type="text"
                  className={`${!showPassword ? 'confirmPassword' : ''}${
                    buttonDisabled ? ' input-error' : ''
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="off"
                  value={confirmPassword}
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
              <label htmlFor="lastName">
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
              <button
                className="text-button"
                type="submit"
                disabled={buttonDisabled === true}
              >
                Sign up
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default signUp;
