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

  // if (usersLiked === null) {
  //   usersLiked = [];
  // }
  // if (usersDisliked === null) {
  //   usersDisliked = [];
  // }
  console.log(usersLiked);
  console.log(usersDisliked);

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
      usersLiked = JSON.parse(res.data.articleUpdate[0].usersLiked);
      usersDisliked = JSON.parse(res.data.articleUpdate[0].usersDisliked);
      console.log(usersLiked);
      console.log(usersDisliked);
      if (usersLiked === null) {
        usersLiked = [];
      }
      if (usersDisliked === null) {
        usersDisliked = [];
      }
      console.log(usersLiked);
      console.log(usersDisliked);
    } catch (err) {
      console.log(err);
      console.log('cant get current article info');
    }
  }

  const handleLike = async (article) => {
    console.log('liking');
    currentArticle.id = article.id;
    console.log(currentArticle.id);
    await updateCurrentArticle(currentArticle.id);
    console.log(currentArticle);
    console.log(usersDisliked);
    if (
      !currentArticle.usersLiked.includes(currentUser.id) &&
      !currentArticle.usersDisliked.includes(currentUser.id)
    ) {
      console.log('adding like');
      console.log(usersLiked);
      usersLiked.push(currentUser.id);
      console.log(usersLiked);
      currentArticle.usersLiked = usersLiked;
      // till here all is good -
    } else if (usersLiked.includes(currentUser.id)) {
      console.log(usersLiked);
      console.log(currentUser.usersLiked);
      console.log('taking out like');
      console.log(currentUser.id);
      const newArray = usersLiked.filter(
        (userThatLiked) => userThatLiked !== currentUser.id
      );
      console.log(newArray);
      currentUser.usersLiked = newArray;
      console.log(currentUser.usersLiked);
    }
    try {
      console.log(usersLiked);
      console.log(currentArticle);
      await axios.put('http://localhost:3001/api/articles/', currentArticle);
      console.log('updating article');
      fetchData();
      console.log('fetch data');
    } catch (err) {
      console.error('Could not like');
    }
  };

  const handleDislike = async (article) => {
    console.log('disliking');

    currentArticle.id = article.id;
    await updateCurrentArticle(currentArticle.id);
    if (
      !currentArticle.usersLiked.includes(currentUser.id) &&
      !currentArticle.usersDisliked.includes(currentUser.id)
    ) {
      console.log('adding dislike');
      usersDisliked.push(currentUser.id);
      console.log(usersDisliked);
      currentArticle.usersDisliked = usersLiked;
    } else if (currentUser.usersLiked.includes(currentUser.id)) {
      console.log('taking out dislike');
      const newArray = usersLiked.filter(
        (userThatLiked) => userThatLiked.id !== currentUser.id
      );
      console.log(newArray);

      currentUser.usersDisliked = newArray;
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
    console.log(articleId);
    console.log(articlesRead);

    if (articlesRead === null) {
      articlesRead = [];
    }
    if (!articlesRead.includes(articleId)) {
      articlesRead.push(articleId);
      console.log('articlesRead');
      console.log(articlesRead);

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
