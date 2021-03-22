// import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react';
import axios from 'axios';

import img from '../../img/profile.png';

import './ShowProfile.css';

function ShowProfile(props) {
  const {
    editProfile,
    changeProfileDetails,
    showProfile,
    openProfile,
    currentUser,
  } = props;

  const { firstName, lastName, id, email, articlesRead } = currentUser;

  function showEditProfile() {
    changeProfileDetails(!editProfile);
    console.log('change state edit profile to true');
  }
  function closeProfile() {
    openProfile(!showProfile);
  }

  return (
    <div className="card">
      <div className="cardTitle">
        <h1>Profile</h1>
        <button className="close-button" type="button" onClick={closeProfile}>
          X
        </button>
      </div>{' '}
      <div className="profile-card">
        <div>
          <p className="name">
            <span>{currentUser.firstName} </span>
            <span>{currentUser.lastName}</span>
          </p>
          <p>{currentUser.email}</p>
        </div>
        <div>
          <img src={img} className="profile-picture" alt="You!" />
        </div>
      </div>
      <div className="button-container">
        <button className="text-button" type="button" onClick={showEditProfile}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ShowProfile;
