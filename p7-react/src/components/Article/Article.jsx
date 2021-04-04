import React, { useState } from 'react';
import './Article.css';
import axios from 'axios';

require('dotenv').config();

export default function displayArticles(props) {
  const {
    articles,
    setArticles,
    currentUser,
    currentArticle,
    setCurrentArticle,
  } = props;
  let { articlesRead } = currentUser;
  if (!articlesRead) {
    articlesRead = [];
  }

  const { usersLiked, usersDisliked } = currentArticle;

  const REACT_APP_SERVER_URL = process.env;

  function fetchData() {
    try {
      fetch(`${REACT_APP_SERVER_URL}/articles`)
        .then((response) => response.json())
        .then((json) => setArticles(json.articles));
    } catch (err) {
      console.log(err);
    }
  }

  async function updateCurrentArticle() {
    try {
      const res = await axios.get(
        `${REACT_APP_SERVER_URL}/${currentArticle.id}`
      );

      currentArticle.usersLiked = JSON.parse(
        res.data.articleUpdate[0].usersLiked
      );
      currentArticle.usersDisliked = JSON.parse(
        res.data.articleUpdate[0].usersDisliked
      );

      if (currentArticle.usersLiked === null) {
        currentArticle.usersLiked = [];
      }
      if (currentArticle.usersDisliked === null) {
        currentArticle.usersDisliked = [];
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleLike = async (article) => {
    currentArticle.id = article.id;
    await updateCurrentArticle(currentArticle.id);

    if (
      currentArticle.usersLiked &&
      !currentArticle.usersLiked.includes(currentUser.id) &&
      currentArticle.usersDisliked &&
      !currentArticle.usersDisliked.includes(currentUser.id)
    ) {
      currentArticle.usersLiked.push(currentUser.id);
    } else if (
      currentArticle.usersLiked &&
      currentArticle.usersLiked.includes(currentUser.id)
    ) {
      const newArray = currentArticle.usersLiked.filter(
        (userThatLiked) => userThatLiked !== currentUser.id
      );
      currentArticle.usersLiked = newArray;
    }
    try {
      await axios.put(`${REACT_APP_SERVER_URL}/articles/`, currentArticle);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislike = async (article) => {
    currentArticle.id = article.id;
    await updateCurrentArticle(currentArticle.id);

    if (
      currentArticle.usersLiked &&
      !currentArticle.usersLiked.includes(currentUser.id) &&
      currentArticle.usersDisliked &&
      !currentArticle.usersDisliked.includes(currentUser.id)
    ) {
      currentArticle.usersDisliked.push(currentUser.id);
    } else if (
      currentArticle.usersDisliked &&
      currentArticle.usersDisliked.includes(currentUser.id)
    ) {
      const newArray = currentArticle.usersDisliked.filter(
        (userThatLiked) => userThatLiked !== currentUser.id
      );
      currentArticle.usersDisliked = newArray;
    }
    try {
      await axios.put(`${REACT_APP_SERVER_URL}/articles/`, currentArticle);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  async function setArticleToRead(articleId) {
    if (articlesRead === null) {
      articlesRead = [];
    }
    if (!articlesRead.includes(articleId)) {
      articlesRead.push(articleId);

      try {
        await axios.put(`${REACT_APP_SERVER_URL}/users/user`, currentUser);

        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      {articles &&
        articles.map((article) => (
          <div
            id="article"
            className={`card articleCard ${
              articlesRead.includes(article.id) ? 'read' : ''
            }`}
            key={article.id}
          >
            <a
              href="http://www.google.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => setArticleToRead(article.id)}
            >
              <h3>{article.title}</h3>
              <div>{article.description}</div>
            </a>
            <div className="like-buttons">
              <button onClick={() => handleLike(article)} type="button">
                <i
                  className={`far fa-thumbs-up ${
                    article.usersLiked &&
                    article.usersLiked.includes(currentUser.id)
                      ? 'liked'
                      : ''
                  }`}
                />
              </button>
              <span>
                {article.usersLiked ? JSON.parse(article.usersLiked).length : 0}
              </span>

              <button onClick={() => handleDislike(article)} type="button">
                <i
                  className={`far fa-thumbs-down ${
                    article.usersDisliked &&
                    article.usersDisliked.includes(currentUser.id)
                      ? 'disliked'
                      : ''
                  }`}
                />
              </button>
              <span>
                {article.usersDisliked
                  ? JSON.parse(article.usersDisliked).length
                  : 0}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}
