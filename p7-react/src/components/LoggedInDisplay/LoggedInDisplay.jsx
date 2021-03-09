import React from 'react';
import ArticleDisplay from '../ArticleDisplay/ArticleDisplay';
import Profile from '../Profile/Profile';

function LoggedInDisplay(props) {
  const {
    showProfile,
    editProfile,
    changeProfileDetails,
    articles,
    addArticle,
    setAddArticle,
    openProfile,
  } = props;

  return (
    <div>
      {showProfile ? (
        <Profile
          editProfile={editProfile}
          showProfile={showProfile}
          openProfile={openProfile}
          changeProfileDetails={changeProfileDetails}
        />
      ) : (
        <ArticleDisplay
          articles={articles}
          addArticle={addArticle}
          setAddArticle={setAddArticle}
        />
      )}
    </div>
  );
}

export default LoggedInDisplay;
