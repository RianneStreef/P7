import React, { useState } from 'react';
import axios from 'axios';
// import { findRenderedComponentWithType } from 'react-dom/test-utils';

function EditProfile(props) {
  const { editProfile, changeProfileDetails, currentUser } = props;

  const [isError, setError] = useState('');
  const [changePassword, setChangePassword] = useState('');

  // somehow get info by id from DB, and set userDetails with this. Use these
  // details as placeholders.

  const [userDetails, setUserDetails] = useState({
    email: currentUser.email,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    id: currentUser.id,
    // picture: '',
  });

  const { email, firstName, lastName, id } = userDetails;

  function closeEditProfile() {
    changeProfileDetails(!editProfile);
  }

  function openChangePassword() {
    setChangePassword(!changePassword);
  }

  const handleInput = (event) => {
    setUserDetails((prevState) => {
      const changingDetails = {
        ...prevState,
        [event.target.name]: event.target.value,
      };
      return changingDetails;
    });
  };

  const handleSubmit = (event) => {
    console.log('sending new profile');
    console.log(userDetails);

    event.preventDefault();
    try {
      axios.put('http://localhost:3001/api/auth/', userDetails);
    } catch (err) {
      console.error('Error submitting');
    }
  };

  const deleteProfile = (event) => {
    console.log('deleting profile');
    console.log(id);
    try {
      axios.delete('http://localhost:3001/api/auth/', id);
    } catch (err) {
      console.error('Error deleting');
    }
  };

  return (
    <>
      <div className="card">
        {isError && <div className="err">{isError}</div>}

        <div className="cardTitle">
          <h1>Edit Profile</h1>
          <button type="button" onClick={deleteProfile}>
            Delete Profile
          </button>
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
            <label htmlFor="email">
              <input
                placeholder="email"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInput}
              />
            </label>
          </div>

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

          <div className="button-container">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>

      <div className="card">
        <form>
          <div className="button-container">
            <button type="button" onClick={openChangePassword}>
              Change Password
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
        </form>
      </div>
    </>
  );
}

export default EditProfile;
