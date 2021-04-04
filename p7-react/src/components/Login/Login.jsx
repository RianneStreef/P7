import React, { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import companyLogo from '../../img/icon-left-font.png';

function Login(props) {
  const {
    currentUser,
    setLoggedIn,
    isError,
    setError,
    isLoading,
    setIsLoading,
    currentArticle,
    setCurrentArticle,
  } = props;

  const [userDetails, setUserDetails] = useState({
    email: 'riannestreef@gmail.com',
    password: 'Hallo',
  });

  useEffect(() => {
    setIsLoading(false);
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
    setError('');
    setIsLoading(true);
    event.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3001/users/login`,
        userDetails
      );
      currentUser.id = res.data.user[0].id;
      currentUser.firstName = res.data.user[0].firstName;
      currentUser.lastName = res.data.user[0].lastName;
      currentUser.email = userDetails.email;
      currentUser.articlesRead = JSON.parse(res.data.user[0].articlesRead);
      currentUser.token = res.data.token;

      currentArticle.id = '';
      currentArticle.usersLiked = [];
      currentArticle.usersDisliked = [];
      setLoggedIn(true);
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
    <div className="login card">
      {isError && <div className="err">{isError}</div>}
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
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
            <div className="button-container">
              <button className="text-button" type="submit">
                Log in
              </button>
            </div>
          </form>
        </>
      )}
      <div className="logo-container">
        <img src={companyLogo} alt="Groupomania logo" className="logo-large" />
      </div>
    </div>
  );
}

export default Login;
