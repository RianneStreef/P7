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
    logOut,
    currentArticle,
    setCurrentArticle,
  } = props;

  return (
    <div className="main">
      {showProfile ? (
        <Profile
          editProfile={editProfile}
          showProfile={showProfile}
          openProfile={openProfile}
          changeProfileDetails={changeProfileDetails}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          logOut={logOut}
        />
      ) : (
        <ArticleDisplay
          articles={articles}
          setArticles={setArticles}
          addArticle={addArticle}
          setAddArticle={setAddArticle}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          currentArticle={currentArticle}
          setCurrentArticle={setCurrentArticle}
        />
      )}
    </div>
  );
}

export default LoggedInDisplay;
