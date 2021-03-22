import React, { useState } from 'react';
import './Article.css';
import axios from 'axios';

export default function displayArticles(props) {
  const { articles, setArticles, currentUser } = props;
  // eslint-disable-next-line prefer-const
  //  let { usersLiked, usersDisliked } = articles;
  let { articlesRead } = currentUser;

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
    currentArticle.usersLiked.push(currentUser.id);
    console.log(currentArticle.usersLiked.length);
    console.log(currentArticle);
    try {
      await axios.put('http://localhost:3001/api/articles/', currentArticle);
      console.log('fetch data');
      fetchData();
    } catch (err) {
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
    console.log('set aricle to read');
    if (articlesRead === null) {
      articlesRead = [];
      articlesRead.push(articleId);
    } else {
      articlesRead.push(articleId);
    }
    try {
      await axios.put('http://localhost:3001/api/auth/', currentUser);
    } catch (err) {
      console.error('Could not mark as read');
    }
  }

  return (
    <div>
      {articles &&
        articles.map((article) => (
          <div className="card articleCard">
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
