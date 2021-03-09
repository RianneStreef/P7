import React from 'react';
import './Article.css';

export default function displayArticles(articles) {
  const { title, description, usersLiked, usersDisliked } = articles;

  const handleClick = () => {
    // articles liked
  };
  return (
    <div className="card articleCard">
      {/* <a href='http://www.google.com' target="_blank">  */}
      <h3>{title}</h3>
      <div>{description}</div>
      {/* </a> */}
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
