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
        />
      )}
    </div>
  );
}

export default FormToDisplay;
