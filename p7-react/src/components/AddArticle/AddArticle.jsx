import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

require('dotenv').config();

function AddArticle(props) {
  const { setArticles, addArticle, setAddArticle } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [articleDetails, setArticleDetails] = useState({
    title: 'New Article',
    description: 'My article',
    url: 'www.google.com',
    usersLiked: [],
    usersDisliked: [],
  });

  const { title, description, url } = articleDetails;

  const { REACT_APP_SERVER_URL } = process.env;

  function closeAddArticle() {
    setAddArticle(!addArticle);
  }

  const handleInput = (event) => {
    setArticleDetails((prevState) => {
      const newDetails = {
        ...prevState,
        [event.target.name]: event.target.value,
      };
      return newDetails;
    });
  };

  function fetchData() {
    try {
      fetch(`${REACT_APP_SERVER_URL}/articles`)
        .then((response) => response.json())
        .then((json) => setArticles(json.articles));
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (event) => {
    setIsLoading(true);

    event.preventDefault();
    try {
      if (articleDetails.usersLiked === null) {
        articleDetails.usersLiked = [];
      }
      if (articleDetails.usersDisliked === null) {
        articleDetails.usersDisliked = [];
      }
      await axios.post(`${REACT_APP_SERVER_URL}/articles/`, articleDetails);
      fetchData();
      setIsLoading(false);
      setAddArticle(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className="cardTitle">
            <h1>Add Article</h1>
            <button
              className="close-button"
              type="button"
              onClick={closeAddArticle}
            >
              X
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">
                <input
                  placeholder="title"
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleInput}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="description">
                <input
                  placeholder="description"
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleInput}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="url">
                <input
                  placeholder="link"
                  type="text"
                  id="url"
                  name="url"
                  value={url}
                  onChange={handleInput}
                />
              </label>
            </div>

            <div className="button-container">
              <button className="text-button" type="submit">
                Submit article
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default AddArticle;
