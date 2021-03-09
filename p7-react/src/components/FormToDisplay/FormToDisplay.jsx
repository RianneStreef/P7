import React from 'react';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';

function FormToDisplay(props) {
  const { isSignedUp, setLoggedIn } = props;
  return (
    <div>{isSignedUp ? <Login /> : <SignUp setLoggedIn={setLoggedIn} />}</div>
  );
}

export default FormToDisplay;
