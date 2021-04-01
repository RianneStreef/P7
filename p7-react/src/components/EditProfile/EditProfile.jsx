import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import axios from 'axios';

function EditProfile(props) {
  const {
    openProfile,
    editProfile,
    changeProfileDetails,
    currentUser,
    setCurrentUser,
    logOut,
  } = props;

  const [isError, setError] = useState('');
  const [changePassword, setChangePassword] = useState('');

  const [userDetails, setUserDetails] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    id: currentUser.id,
  });

  const [newPassword, setNewPassword] = useState({
    password: '',
    confirmPassword: '',
    id: currentUser.id,
    token: currentUser.token,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { firstName, lastName, id, password, confirmPassword } = userDetails;

  useEffect(() => {
    console.log('password details updated');
    if (newPassword.password === newPassword.confirmPassword) {
      console.log('passwords matching');
      setButtonDisabled(false);
    }
    if (newPassword.password !== newPassword.confirmPassword) {
      console.log('passwords not matching');
      setButtonDisabled(true);
    }
  }, [newPassword]);

  function closeEditProfile() {
    changeProfileDetails(false);
  }

  function closeEditPassword() {
    setChangePassword(false);
  }

  function openChangePassword() {
    setChangePassword(!changePassword);
  }

  function displayPassword() {
    setShowPassword(!showPassword);
  }

  const deleteProfile = async () => {
    console.log('deleting profile');
    console.log(id);
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      logOut();
    } catch (err) {
      console.log(err);
      console.error('Error deleting');
    }
  };

  const savePassword = () => {
    console.log('changing password');
    console.log(currentUser);
    console.log(id);
    // const passwordInfo = { password: newPassword.password, userId: id };
    try {
      axios.put('http://localhost:3001/users/password', newPassword);
      changeProfileDetails(false);
    } catch (err) {
      console.log(err);
      console.log('error changing password');
    }
  };

  const handleInput = (event) => {
    setUserDetails((prevState) => {
      const newCurrentUserDetails = {
        ...prevState,
        [event.target.name]: event.target.value,
      };
      return newCurrentUserDetails;
    });
    console.log(userDetails);
  };

  const handlePasswordInput = (event) => {
    setNewPassword((prevState) => {
      const passwordInput = {
        ...prevState,
        [event.target.name]: event.target.value,
      };
      return passwordInput;
    });
  };

  const handleSubmit = async (event) => {
    console.log('sending new profile');
    console.log(userDetails);
    currentUser.id = userDetails.id;
    currentUser.firstName = userDetails.firstName;
    currentUser.lastName = userDetails.lastName;
    console.log(currentUser);

    event.preventDefault();
    try {
      console.log('contacting db');
      await axios.put(`http://localhost:3001/users/user`, currentUser);
      openProfile(false);
    } catch (err) {
      setButtonDisabled(true);
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

          <div>
            {!changePassword ? (
              <>
                <div className="button-container">
                  <button
                    className="link-button"
                    type="button"
                    onClick={openChangePassword}
                  >
                    I would like to change my password
                  </button>
                </div>
              </>
            ) : (
              <div className="close-button-container">
                <button
                  className="close-button"
                  type="button"
                  onClick={closeEditPassword}
                >
                  X
                </button>
              </div>
            )}
            {changePassword && (
              <>
                <div className="password-button">
                  <div className="form-group">
                    <label htmlFor="password">
                      <input
                        placeholder="new password"
                        type="text"
                        id="password"
                        name="password"
                        className={`${
                          !showPassword ? 'password' : 'password-input'
                        }`}
                        value={password}
                        autoComplete="off"
                        onChange={handlePasswordInput}
                      />
                    </label>
                  </div>
                  <button
                    className="eye-button"
                    type="button"
                    onClick={displayPassword}
                  >
                    {!showPassword ? (
                      <i className="fas fa-eye" />
                    ) : (
                      <i className="fas fa-eye-slash" />
                    )}
                  </button>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <input
                      placeholder="confirm new password"
                      type="text"
                      className={`${!showPassword ? 'confirmPassword' : ''}${
                        buttonDisabled ? ' input-error' : ''
                      }`}
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="off"
                      value={confirmPassword}
                      onChange={handlePasswordInput}
                    />
                  </label>
                </div>
              </>
            )}
          </div>
          <div className="button-container">
            {!changePassword ? (
              <button className="text-button" type="submit">
                Save
              </button>
            ) : (
              <button
                className="text-button"
                type="button"
                onClick={savePassword}
                disabled={buttonDisabled === true}
              >
                Save password
              </button>
            )}
            <button
              className="text-button"
              type="button"
              onClick={deleteProfile}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
