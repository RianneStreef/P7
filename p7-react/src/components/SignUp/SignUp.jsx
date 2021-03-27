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
  } = signUpDetails;

  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [passwordsEqual, setPasswordsToEqual] = useState(false);

  const inputButtonHandler = () => {
    console.log('checking password and length');
    console.log(password.length);
    console.log(passwordsEqual);

    if (password.length > 0 && passwordsEqual === true) {
      setButtonDisabled(false);
    }
  };

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
    /* console.log(signUpDetails.password);
    console.log(signUpDetails.confirmPassword);
    console.log(buttonDisabled);
    if (signUpDetails.password === signUpDetails.confirmPassword) {
      console.log('passwords matching');
      setButtonDisabled(false);
    }
    if (signUpDetails.password !== signUpDetails.confirmPassword) {
      console.log('passwords not matching');
      setButtonDisabled(true);
    } */
  };

  useEffect(() => {
    console.log('Signup details updated');
    inputButtonHandler();
    if (signUpDetails.password === signUpDetails.confirmPassword) {
      console.log('passwords matching');
      console.log(signUpDetails.password);
      console.log(signUpDetails.confirmPassword);
      setPasswordsToEqual(true);
      console.log(passwordsEqual);
    } else {
      console.log('passwords not matching');
      console.log(signUpDetails.password);
      console.log(signUpDetails.confirmPassword);
      setPasswordsToEqual(false);
      console.log(passwordsEqual);
    }
  }, [signUpDetails]);

  const handleSubmit = async (event) => {
    console.log('sending signup details');
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
      setButtonDisabled(true);
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
