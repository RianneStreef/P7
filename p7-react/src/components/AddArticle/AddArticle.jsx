import React, { useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

function AddArticle(props) {
  const { articles, setArticles, addArticle, setAddArticle } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [articleDetails, setArticleDetails] = useState({
    title: 'New Article',
    description: 'My article',
    url: 'www.google.com',
    usersLiked: [1, 2, 3],
    usersDisliked: [],
  });

  const { title, description, url, usersLiked, usersDisliked } = articleDetails;

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
    console.log('fetching data');
    fetch('http://localhost:3001/api/articles')
      .then((response) => response.json())
      .then((json) => setArticles(json.articles));
  }

  const handleSubmit = async (event) => {
    console.log('sending article');
    setIsLoading(true);

    event.preventDefault();
    try {
      console.log(articleDetails);
      await axios.post('http://localhost:3001/api/articles/', articleDetails);
      fetchData();
      setIsLoading(false);
      setAddArticle(false);
    } catch (err) {
      console.error('Error posting article');
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
              <button type="submit">Submit article</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default AddArticle;
