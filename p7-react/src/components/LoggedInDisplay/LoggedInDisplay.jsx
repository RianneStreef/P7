import React from 'react';
import ArticleDisplay from '../ArticleDisplay/ArticleDisplay';
import Profile from '../Profile/Profile';

function LoggedInDisplay(props) {
  const {
    showProfile,
    editProfile,
    changeProfileDetails,
    articles,
    setArticles,
    addArticle,
    setAddArticle,
    openProfile,
    currentUser,
  } = props;

  return (
    <div>
      {showProfile ? (
        <Profile
          editProfile={editProfile}
          showProfile={showProfile}
          openProfile={openProfile}
          changeProfileDetails={changeProfileDetails}
          currentUser={currentUser}
        />
      ) : (
        <ArticleDisplay
          articles={articles}
          setArticles={setArticles}
          addArticle={addArticle}
          setAddArticle={setAddArticle}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}

export default LoggedInDisplay;
