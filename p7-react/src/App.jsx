import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import FormToDisplay from './components/FormToDisplay/FormToDisplay';
import LoggedInDisplay from './components/LoggedInDisplay/LoggedInDisplay';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSignedUp, setSignUp] = useState(true);
  const [articles, setArticles] = useState([]);
  const [addArticle, setAddArticle] = useState(false);
  const [showProfile, openProfile] = useState(false);
  const [editProfile, changeProfileDetails] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  function changeLogin() {
    setLoggedIn(!isLoggedIn);
    setAddArticle(false);
    openProfile(false);
    changeProfileDetails(false);
  }

  function changeCurrentUser() {
    setCurrentUser({});
  }

  function logOut() {
    changeLogin();
    changeCurrentUser();
    console.log(currentUser);
    console.log('logged out');
  }

  useEffect(() => {
    // Runs once. When it runs, it will call the fetchData()
    //    function.
    // fetchData() function will add the API call data to your state
    function fetchData() {
      console.log('articles fetched');
      fetch('http://localhost:3001/api/articles')
        .then((response) => response.json())
        .then((json) => setArticles(json.articles));
    }

    fetchData();
  }, []); // dependencies

  console.log(articles);

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
        />
      ) : (
        <FormToDisplay
          isLoggedIn={isLoggedIn}
          setLoggedIn={setLoggedIn}
          isSignedUp={isSignedUp}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}

      <button type="button" onClick={changeLogin}>
        Change Login
      </button>
    </div>
  );
}

export default App;
