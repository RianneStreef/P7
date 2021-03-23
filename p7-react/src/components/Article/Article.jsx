import React, { useState } from 'react';
import './Article.css';
import axios from 'axios';

export default function displayArticles(props) {
  const { articles, setArticles, currentUser } = props;
  // eslint-disable-next-line prefer-const
  //  let { usersLiked, usersDisliked } = articles;
  let { articlesRead } = currentUser;
  if (!articlesRead) {
    articlesRead = [];
  }

  console.log('articlesRead', articlesRead);

  const [currentArticle, setCurrentArticle] = useState({
    id: '',
    usersLiked: [],
    usersDisliked: [1, 2, 3],
  });

  const { id, usersLiked, usersDisliked } = currentArticle;

  console.log('current user: ');
  console.log(currentUser);

  // console.log(articles[0].usersLiked);

  function fetchData() {
    console.log('fetching data');
    fetch('http://localhost:3001/api/articles')
      .then((response) => response.json())
      .then((json) => setArticles(json.articles));
  }

  const handleLike = async (articleId) => {
    console.log(articleId);
    currentArticle.id = articleId;
    if (!currentArticle.usersLiked.includes(currentUser.id)) {
      currentArticle.usersLiked.push(currentUser.id);
      console.log('Doesnt have id, adding it');
    }
    console.log(currentArticle.usersLiked.length);
    console.log(currentArticle);
    console.log('HANDLE LIKE');
    try {
      console.log('await axois');
      console.log(currentArticle);
      await axios.put('http://localhost:3001/api/articles/', currentArticle);
      console.log('After call');
      console.log('fetch data');
      fetchData();
    } catch (err) {
      console.log(err);
      console.error('Could not like');
    }
  };

  const handleDislike = async (articleId) => {
    // setCurrentArticle(article);
    // console.log(currentArticle);
    // usersLiked.push(currentUser.id);
    // try {
    //   await axios.put('http://localhost:3001/api/articles/');
    // } catch (err) {
    //   console.error('Could not dislike');
    // }
  };

  async function setArticleToRead(articleId) {
    console.log('set article to read');
    if (articlesRead === null || articlesRead === undefined) {
      articlesRead = [];
      articlesRead.push(articleId);
    } else {
      articlesRead.push(articleId);
    }
    try {
      const response = await axios.put(
        'http://localhost:3001/api/auth/',
        currentUser
      );
      console.log(response);

      console.log('Doing call');
      fetchData();
    } catch (err) {
      console.error('Could not mark as read');
    }
  }

  // const classVariable = articlesRead.includes(article.id)

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
            {/* This needs to be a function in here with something like:
          map -> if article id is in articlesRead, then, add
          className read to div
           */}

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
              <button onClick={() => handleLike(article.id)} type="button">
                <i className="far fa-thumbs-up" />
              </button>
              <span>{article.usersLiked ? article.usersLiked.length : 0}</span>

              <button onClick={() => handleDislike(article.id)} type="button">
                <i className="far fa-thumbs-down" />
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
