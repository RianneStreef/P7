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
    // This id needs to be used to find that one article and set
    // usersLiked and usersDisliked, otherwise it will be overwritten
    // anytime it is reset

    // So when the id is set --> axios get this one article, and set usersLiked
    // and
  });

  const { id } = currentArticle;
  let { usersLiked, usersDisliked } = currentArticle;
  if (usersLiked === null) {
    usersLiked = [];
  }
  if (usersDisliked === null) {
    usersDisliked = [];
  }

  console.log('usersLiked');
  console.log(usersLiked);

  console.log('current article: ');
  console.log(currentArticle);

  // console.log(articles[0].usersLiked);

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

  async function updateCurrentArticle(currentArticleId) {
    console.log(currentArticleId);
    console.log('getting current article');
    try {
      const res = await axios.get(
        `http://localhost:3001/api/articles/${currentArticleId}`
      );
      console.log('getting article info');
      console.log(res);
    } catch (err) {
      console.log('cant get current article info');
    }
  }

  const handleLike = async (article) => {
    currentArticle.id = article.id;
    await updateCurrentArticle(currentArticle.id);

    if (!usersLiked.includes(currentUser.id)) {
      usersLiked.push(currentUser.id);
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
    if (!usersDisliked.includes(currentUser.id)) {
      currentArticle.usersDisliked.push(currentUser.id);
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
                    usersLiked.includes(currentUser.id) ? 'liked' : ''
                  }`}
                />
              </button>
              <span>{article.usersLiked ? article.usersLiked.length : 0}</span>

              <button onClick={() => handleDislike(article)} type="button">
                <i
                  className={`far fa-thumbs-down ${
                    usersDisliked.includes(currentUser.id) ? 'disliked' : ''
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
