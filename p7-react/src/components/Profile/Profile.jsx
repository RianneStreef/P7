import React from 'react';
import ShowProfile from '../ShowProfile/ShowProfile';
import EditProfile from '../EditProfile/EditProfile';

function Profile(props) {
  const {
    editProfile,
    changeProfileDetails,
    showProfile,
    openProfile,
    currentUser,
    setCurrentUser,
  } = props;
  return (
    <div>
      <div>
        {editProfile ? (
          <EditProfile
            editProfile={editProfile}
            changeProfileDetails={changeProfileDetails}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        ) : (
          <ShowProfile
            editProfile={editProfile}
            showProfile={showProfile}
            openProfile={openProfile}
            changeProfileDetails={changeProfileDetails}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
