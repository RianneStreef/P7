import React from 'react';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';

function FormToDisplay(props) {
  const { isSignedUp } = props;
  return <div>{isSignedUp ?  <Login /> : <SignUp /> }</div>;
}

export default FormToDisplay;
