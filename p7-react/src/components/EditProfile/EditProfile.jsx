import React, { useState } from 'react';
import './EditProfile.css';
import axios from 'axios';
// import { findRenderedComponentWithType } from 'react-dom/test-utils';

function EditProfile(props) {
  const {
    editProfile,
    changeProfileDetails,
    currentUser,
    setCurrentUser,
  } = props;

  const [isError, setError] = useState('');
  const [changePassword, setChangePassword] = useState('');

  const [userDetails, setUserDetails] = useState({
    email: currentUser.email,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    id: currentUser.id,
    // picture: '',
  });

  const { email, firstName, lastName, id } = currentUser;

  function closeEditProfile() {
    changeProfileDetails(!editProfile);
  }

  function openChangePassword() {
    setChangePassword(!changePassword);
  }

  const deleteProfile = async () => {
    console.log('deleting profile');
    console.log(id);
    try {
      axios.delete('http://localhost:3001/api/auth/', id);
    } catch (err) {
      console.error('Error deleting');
    }
  };

  const handleInput = (event) => {
    setCurrentUser((prevState) => {
      const newCurrentUserDetails = {
        ...prevState,
        [event.target.name]: event.target.value,
      };
      return newCurrentUserDetails;
    });
  };

  const handleSubmit = (event) => {
    console.log('sending new profile');
    console.log(currentUser);

    event.preventDefault();
    try {
      axios.put('http://localhost:3001/api/auth/', currentUser);
    } catch (err) {
      console.error('Error submitting');
    }
  };

  return (
    <>
      <div className="card">
        {isError && <div className="err">{isError}</div>}

        <div className="cardTitle">
          <h1>Edit Profile</h1>

          <button
            className="close-button"
            type="button"
            onClick={closeEditProfile}
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">
              <input
                placeholder="first name"
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleInput}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">
              <input
                placeholder="last name"
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleInput}
              />
            </label>
          </div>
          {/* <div className="form-group">
          <label htmlFor="picture">
            <input
              placeholder="upload photo"
              type="text"
              id="picture"
              name="picture"
              value={picture}
              onChange={handleInput}
            />
          </label>
        </div> */}
          <div>
            <div className="button-container">
              <button
                className="link-button"
                type="button"
                onClick={openChangePassword}
              >
                I would like to change my password
              </button>
            </div>

            {changePassword && (
              <div className="form-group">
                <label htmlFor="password">
                  <input
                    placeholder="new password"
                    type="text"
                    id="password"
                    name="password"
                    // value={password}
                    onChange={handleInput}
                  />
                </label>
              </div>
            )}
          </div>
          <div className="button-container">
            <button type="submit">Save</button>
            <button type="button" onClick={deleteProfile}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
