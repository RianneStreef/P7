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
  } = props;
  return (
    <div>
      {isSignedUp ? (
        <Login
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          isSignedUp={isSignedUp}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      ) : (
        <SignUp
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
}

export default FormToDisplay;
