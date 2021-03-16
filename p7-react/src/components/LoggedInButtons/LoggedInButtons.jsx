import React from 'react';

function LoggedInButtons(props) {
  const {
    isLoggedIn,
    setLoggedIn,
    changeLogin,
    showProfile,
    openProfile,
    currentUser,
    setCurrentUser,
    changeCurrentUser,
  } = props;

  function setProfile() {
    openProfile(!showProfile);
    console.log('Showing Profile');
    console.log(setLoggedIn);
    console.log(isLoggedIn);
  }

  function logOut() {
    changeLogin();
    changeCurrentUser();
    console.log(currentUser);
    console.log('logged out');
  }

  return (
    <div>
      <button
        type="button"
        onClick={setProfile}
        data-testid="test-button-profile"
      >
        {' '}
        {showProfile ? <p>Articles</p> : <p>Profile</p>}
      </button>
      <button type="button" onClick={logOut} data-testid="test-button-sign-out">
        Sign Out
      </button>
    </div>
  );
}

export default LoggedInButtons;
