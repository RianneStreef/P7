import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import FormToDisplay from './components/FormToDisplay/FormToDisplay';
import LoggedInDisplay from './components/LoggedInDisplay/LoggedInDisplay';
// import MockArticles from './mock-data/mock-data';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSignedUp, setSignUp] = useState(true);
  const [articles, setArticles] = useState([]);
  const [addArticle, setAddArticle] = useState(false);
  const [showProfile, openProfile] = useState(false);
  const [editProfile, changeProfileDetails] = useState(false);

  function changeLogin() {
    setLoggedIn(!isLoggedIn);
    console.log(isLoggedIn);
  }

  useEffect(() => {
    // Runs once. When it runs, it will call the fetchData()
    //    function.
    // fetchData() function will add the API call data to your state
    function fetchData() {
      fetch('http://localhost:3001/api/articles')
        .then((response) => response.json())
        .then((json) => setArticles(json.articles));
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
      />

      <button type="button" onClick={changeLogin}>
        Change Login
      </button>

      {isLoggedIn ? (
        <LoggedInDisplay
          isLoggedIn={isLoggedIn}
          isSignedUp={isSignedUp}
          articles={articles}
          addArticle={addArticle}
          setAddArticle={setAddArticle}
          showProfile={showProfile}
          openProfile={openProfile}
          editProfile={editProfile}
          changeProfileDetails={changeProfileDetails}
        />
      ) : (
        <FormToDisplay isLoggedIn={isLoggedIn} isSignedUp={isSignedUp} />
      )}
    </div>
  );
}

export default App;
