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
    setCurrentUser,
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
          setCurrentUser={setCurrentUser}
        />
      ) : (
        <ArticleDisplay
          articles={articles}
          setArticles={setArticles}
          addArticle={addArticle}
          setAddArticle={setAddArticle}
        />
      )}
    </div>
  );
}

export default LoggedInDisplay;
