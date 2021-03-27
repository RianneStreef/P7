import React, { useState } from 'react';
import './Article.css';
import axios from 'axios';

export default function displayArticles(props) {
  const { articles, setArticles, currentUser } = props;
  let { articlesRead } = currentUser;
  if (!articlesRead) {
    articlesRead = [];
  }

  const [currentArticle, setCurrentArticle] = useState({
    id: '',
    usersLiked: [],
    usersDisliked: [],
  });

  let { usersLiked, usersDisliked } = currentArticle;

  if (usersLiked === null) {
    usersLiked = [];
  }
  if (usersDisliked === null) {
    usersDisliked = [];
  }

  function fetchData() {
    console.log('fetching data');
    try {
      fetch('http://localhost:3001/api/articles')
        .then((response) => response.json())
        .then((json) => setArticles(json.articles));
    } catch {
      // try again?!
    }
  }

  async function updateCurrentArticle() {
    console.log(currentArticle.id);
    console.log('getting current article');
    console.log(currentArticle);
    try {
      const res = await axios.get(
        `http://localhost:3001/api/articles/${currentArticle.id}`
      );
      console.log('getting article info');
      console.log(res);
      currentArticle.usersLiked = JSON.parse(
        res.data.articleUpdate[0].usersLiked
      );
      currentArticle.usersDisliked = JSON.parse(
        res.data.articleUpdate[0].usersDisliked
      );
      if (currentArticle.usersLiked === null) {
        usersLiked = [];
      }
      if (currentArticle.usersDisliked === null) {
        usersDisliked = [];
      }
      console.log(typeof currentArticle.usersLiked);
    } catch (err) {
      console.log('cant get current article info');
    }
  }

  const handleLike = async (article) => {
    currentArticle.id = article.id;
    await updateCurrentArticle(currentArticle.id);
    console.log(currentArticle.id);
    console.log(usersLiked);
    console.log(typeof usersLiked);

    if (
      !usersLiked.includes(currentUser.id) &&
      !currentArticle.usersDisliked.includes(currentUser.id)
    ) {
      currentArticle.usersLiked.push(currentUser.id);
      console.log(currentArticle.usersLiked);
    } else if (currentArticle.usersLiked.includes(currentUser.id)) {
      console.log('taking out like');
      console.log(currentUser.id);
      const newArray = currentArticle.usersLiked.filter(
        (userThatLiked) => userThatLiked !== currentUser.id
      );
      console.log(newArray);

      currentArticle.usersLiked = newArray;
    }
    try {
      await axios.put('http://localhost:3001/api/articles/', currentArticle);
      console.log('updating article');
      fetchData();
      console.log('fetch data');
    } catch (err) {
      console.error('Could not like');
    }
  };

  const handleDislike = async (article) => {
    currentArticle.id = article.id;
    await updateCurrentArticle(currentArticle.id);
    if (
      !currentArticle.usersLiked.includes(currentUser.id) &&
      !currentArticle.usersDisliked.includes(currentUser.id)
    ) {
      currentArticle.usersDisliked.push(currentUser.id);
      console.log(currentArticle.usersDisliked);
    } else if (currentArticle.usersDisliked.includes(currentUser.id)) {
      console.log('taking out dislike');
      console.log(currentUser.id);
      const newArray = currentArticle.usersDisliked.filter(
        (userThatDisliked) => userThatDisliked !== currentUser.id
      );
      console.log(newArray);

      currentArticle.usersDisliked = newArray;
    }
    try {
      await axios.put('http://localhost:3001/api/articles/', currentArticle);
      console.log('updating article');
      fetchData();
      console.log('fetch data');
    } catch (err) {
      console.error('Could not dislike');
    }
  };

  async function setArticleToRead(articleId) {
    console.log('set article to read');

    if (articlesRead === null) {
      articlesRead = [];
    }
    if (!articlesRead.includes(articleId)) {
      articlesRead.push(articleId);

      try {
        await axios.put('http://localhost:3001/api/auth/', currentUser);
        fetchData();
      } catch (err) {
        console.error('Could not mark as read');
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
              <span>{article.usersLiked ? article.usersLiked.length : 0}</span>

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
                {article.usersDisliked ? article.usersDisliked.length : 0}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}
