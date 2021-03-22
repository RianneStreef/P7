import React from 'react';
import './Header.css';
import LoggedInButtons from '../LoggedInButtons/LoggedInButtons';

function Header(props) {
  const {
    isSignedUp,
    setSignUp,
    isLoggedIn,
    setLoggedIn,
    changeLogin,
    showProfile,
    openProfile,
    currentUser,
    setCurrentUser,
    changeCurrentUser,
  } = props;

  function changeSignUp() {
    setSignUp(!isSignedUp);
  }

  return (
    <header data-testid="header">
      <div className="logo" />
      <div className="title">Connect - E</div>
      {!isLoggedIn ? (
        <button
          className="button"
          type="button"
          onClick={changeSignUp}
          data-testid="button-header"
        >
          {isSignedUp ? (
            <>
              <p className="button hide-mobile">Sign Up</p>
              <i className="icon-button hide-desktop fas fa-user-plus" />
            </>
          ) : (
            <>
              <p className="button hide-mobile">Log In</p>
              <i className="icon-button hide-desktop fas fa-sign-in-alt" />
            </>
          )}
        </button>
      ) : (
        <LoggedInButtons
          data-testid="test-logged-in-buttons"
          showProfile={showProfile}
          openProfile={openProfile}
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          changeLogin={changeLogin}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          changeCurrentUser={changeCurrentUser}
        />
      )}
    </header>
  );
}

export default Header;
