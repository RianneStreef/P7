import React, { useState } from 'react';
import axios from 'axios';

function EditProfile(props) {
  const { editProfile, changeProfileDetails } = props;

  const [userDetails, setUserDetails] = useState({
    email: 'ri@anne.com',
    password: 'an',
    first: 'ne',
    last: 'st',
    picture: 'reef',
  });

  const { email, password, first, last, picture } = userDetails;

  function closeEditProfile() {
    changeProfileDetails(!editProfile);
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

    event.preventDefault();
    try {
      axios.post('http://localhost:3001/api/auth/1', userDetails);
    } catch (err) {
      console.error('Error submitting');
    }
  };

  return (
    <div className="card">
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
          <label htmlFor="password">
            <input
              placeholder="password"
              type="text"
              id="password"
              name="password"
              value={password}
              onChange={handleInput}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="first">
            <input
              placeholder="first name"
              type="text"
              id="first"
              name="first"
              value={first}
              onChange={handleInput}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="last">
            <input
              placeholder="last name"
              type="text"
              id="last"
              name="last"
              value={last}
              onChange={handleInput}
            />
          </label>
        </div>
        <div className="form-group">
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
        </div>

        <div className="button-container">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
