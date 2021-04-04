import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import FormToDisplay from './components/FormToDisplay/FormToDisplay';
import LoggedInDisplay from './components/LoggedInDisplay/LoggedInDisplay';

require('dotenv').config();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSignedUp, setSignUp] = useState(true);
  const [articles, setArticles] = useState([]);
  const [addArticle, setAddArticle] = useState(false);
  const [showProfile, openProfile] = useState(false);
  const [editProfile, changeProfileDetails] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    articlesRead: [],
    token: '',
  });
  const [currentArticle, setCurrentArticle] = useState({
    id: '',
    usersLiked: [],
    usersDisliked: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState('');

  function changeLogin() {
    setLoggedIn(!isLoggedIn);
    setAddArticle(false);
    openProfile(false);
    changeProfileDetails(false);
  }

  function changeCurrentUser() {
    setCurrentUser({
      articlesRead: [],
      email: '',
      firstName: '',
      lastName: '',
      id: '',
      token: '',
    });
  }

  function logOut() {
    changeLogin();
    changeCurrentUser();
  }

  const { REACT_APP_SERVER_URL } = process.env;

  useEffect(() => {
    function fetchData(req, res, err) {
      fetch(`${REACT_APP_SERVER_URL}/articles`)
        .then((response) => response.json())
        .then((json) => setArticles(json.articles));
      if (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []); // dependencies

  return (
    <div className="wrapper">
      <Header
        isSignedUp={isSignedUp}
        setSignUp={setSignUp}
        isLoggedIn={isLoggedIn}
        showProfile={showProfile}
        openProfile={openProfile}
        changeLogin={changeLogin}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        changeCurrentUser={changeCurrentUser}
        logOut={logOut}
      />

      {isLoggedIn ? (
        <LoggedInDisplay
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          isSignedUp={isSignedUp}
          articles={articles}
          setArticles={setArticles}
          addArticle={addArticle}
          setAddArticle={setAddArticle}
          showProfile={showProfile}
          openProfile={openProfile}
          editProfile={editProfile}
          changeProfileDetails={changeProfileDetails}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          logOut={logOut}
          currentArticle={currentArticle}
          setCurrentArticle={setCurrentArticle}
        />
      ) : (
        <FormToDisplay
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          isSignedUp={isSignedUp}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          isError={isError}
          setError={setError}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          currentArticle={currentArticle}
          setCurrentArticle={setCurrentArticle}
        />
      )}
    </div>
  );
}

export default App;
