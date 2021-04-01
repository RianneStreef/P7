import React from 'react';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';

function FormToDisplay(props) {
  const {
    isLoggedIn,
    setLoggedIn,
    isSignedUp,
    currentUser,
    setCurrentUser,
    isError,
    setError,
    isLoading,
    setIsLoading,
    currentArticle,
    setCurrentArticle,
  } = props;
  return (
    <div className="main">
      {isSignedUp ? (
        <Login
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          isSignedUp={isSignedUp}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          isError={isError}
          setError={setError}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          currentArticle={currentArticle}
          setCurrentArticle={setCurrentArticle}
        />
      ) : (
        <SignUp
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          isError={isError}
          setError={setError}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          currentArticle={currentArticle}
          setCurrentArticle={setCurrentArticle}
        />
      )}
    </div>
  );
}

export default FormToDisplay;
