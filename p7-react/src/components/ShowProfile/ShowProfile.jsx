import React from 'react';
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

  function showEditProfile() {
    changeProfileDetails(!editProfile);
    console.log('change state edit profile to true');
  }
  function closeProfile() {
    openProfile(!showProfile);
  }

  function findCurrentUser() {}

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
            <span>Rianne</span>
            <span>Streef</span>
          </p>
          <p>riannestreef@gmail.com</p>
        </div>
        <div>
          <img src={img} alt="You!" />
        </div>
      </div>
      <div className="button-container">
        <button type="button" onClick={showEditProfile}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ShowProfile;
