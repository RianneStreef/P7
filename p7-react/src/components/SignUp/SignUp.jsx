import React, { useEffect, useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

function signUp(props) {
  const {
    isLoggedIn,
    setLoggedIn,
    currentUser,
    setCurrentUser,
    isError,
    setError,
    isLoading,
    setIsLoading,
    currentArticle,
    setCurrentArticle,
  } = props;

  const [signUpDetails, setSignUpDetails] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
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
    if (signUpDetails.password === signUpDetails.confirmPassword) {
      setButtonDisabled(false);
    }
    if (signUpDetails.password !== signUpDetails.confirmPassword) {
      setButtonDisabled(true);
    }
  }, [signUpDetails]);

  const handleSubmit = async (event) => {
    setError('');
    setIsLoading(true);

    event.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3001/users/signup',
        signUpDetails
      );
      setIsLoading(false);
      setLoggedIn(true);

      currentUser.email = res.data.user.email;
      currentUser.id = res.data.user.id;
      currentUser.firstName = res.data.user.firstName;
      currentUser.lastName = res.data.user.lastName;
      currentUser.articlesRead = JSON.parse(res.data.user.articlesRead);
      currentUser.token = res.data.user.token;

      currentArticle.id = '';
      currentArticle.usersLiked = [];
      currentArticle.usersDisliked = [];
    } catch (err) {
      if (err?.response && err?.response?.data?.message) {
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
