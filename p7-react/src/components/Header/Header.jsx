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
    logOut,
  } = props;

  function changeSignUp() {
    setSignUp(!isSignedUp);
  }

  return (
    <>
      <header data-testid="header">
        <div className="logo" />
        {!isLoggedIn ? (
          <button
            type="button"
            onClick={changeSignUp}
            data-testid="button-header"
          >
            {isSignedUp ? (
              <>
                <p className="text-button hide-mobile">Sign Up</p>
                <i className="icon-button hide-desktop fas fa-user-plus" />
              </>
            ) : (
              <>
                <p className="text-button hide-mobile">Log In</p>
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
            logOut={logOut}
          />
        )}
      </header>
      <div className="title">
        <p>Connect - E</p>
      </div>
    </>
  );
}

export default Header;
