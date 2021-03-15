import React from 'react';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';

function FormToDisplay(props) {
  const { isLoggedIn, setLoggedIn, isSignedUp } = props;
  return (
    <div>
      {isSignedUp ? (
        <Login
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          isSignedUp={isSignedUp}
        />
      ) : (
        <SignUp isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default FormToDisplay;
