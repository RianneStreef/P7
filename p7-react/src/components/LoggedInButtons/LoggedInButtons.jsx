import React from 'react';
import './LoggedInButtons.css';

function LoggedInButtons(props) {
  const { showProfile, openProfile, logOut } = props;

  function setProfile() {
    openProfile(!showProfile);
  }

  return (
    <div>
      <button
        type="button"
        onClick={setProfile}
        data-testid="test-button-profile"
      >
        {showProfile ? (
          <>
            <p className="text-button hide-mobile">Articles</p>
            <i className="icon-button hide-desktop fas fa-newspaper" />
          </>
        ) : (
          <>
            <p className="text-button hide-mobile">Profile</p>
            <i className="icon-button hide-desktop far fa-user" />
          </>
        )}
      </button>
      <button type="button" onClick={logOut} data-testid="test-button-sign-out">
        <p className="text-button hide-mobile">Sign out</p>
        <i className="icon-button hide-desktop fas fa-sign-out-alt" />
      </button>
    </div>
  );
}

export default LoggedInButtons;
