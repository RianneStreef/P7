import React, { useState } from 'react';
import axios from 'axios';

function AddArticle(props) {
  const { addArticle, setAddArticle } = props;
  const [articleDetails, setArticleDetails] = useState({
    title: 'New Article',
    description: 'My article',
    url: 'www.google.com',
    usersLiked: [],
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

  const handleSubmit = (event) => {
    console.log('sending article');
    event.preventDefault();
    try {
      axios.post('http://localhost:3001/api/auth/articles/', articleDetails);
    } catch (err) {
      console.error('Error logging in');
    }
  };

  return (
    <div className="card">
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
      </form>
      <div className="button-container">
        <button type="submit">Submit article</button>
      </div>
    </div>
  );
}

export default AddArticle;
