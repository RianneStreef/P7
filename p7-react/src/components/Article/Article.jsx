import React from 'react';
import './Article.css';

export default function displayArticles(props) {
  const { articles, currentUser } = props;
  const { id, title, description, usersLiked, usersDisliked } = articles;
  const { articlesRead } = currentUser;

  const handleClick = () => {
    // articles liked
  };

  function setArticleToRead() {
    console.log('add article to read list');
    console.log(key);
    console.log(articlesRead);
  }

  return (
    <div className="card articleCard">
      <a
        href="http://www.google.com"
        target="_blank"
        rel="noreferrer"
        onClick={setArticleToRead}
      >
        <h3>{title}</h3>
        <div>{description}</div>
      </a>
      <button onClick={handleClick} type="button" className="icon-button">
        <i className="far fa-thumbs-up" />
      </button>
      <span>{usersLiked ? usersLiked.length : 0}</span>

      <button onClick={handleClick} type="button" className="icon-button">
        <i className="far fa-thumbs-down" />
      </button>
      <span>{usersDisliked ? usersDisliked.length : 0}</span>
    </div>
  );
}
