import React from 'react';

function LoggedInButtons(props) {
  const { isLoggedIn, setLoggedIn, changeLogin, showProfile, openProfile} = props;
  function setProfile() {
    openProfile(!showProfile);
    console.log('Showing Profile');
    console.log(setLoggedIn);
    console.log(isLoggedIn);
  }
 
  return (
    <div>
      <button
        type="button"
        onClick={setProfile}
        data-testid="test-button-profile"
      > {showProfile ? <p>Articles</p> : <p>Profile</p>}
      </button>
      <button
        type="button"
        onClick={changeLogin}
        data-testid="test-button-sign-out"
      >Sign Out</button>
     
    </div>
  );
}

export default LoggedInButtons;
