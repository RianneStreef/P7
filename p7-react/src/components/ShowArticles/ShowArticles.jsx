import React from 'react';
import Article from '../Article/Article';

function ShowArticles(props) {
  const { articles, addArticle, setAddArticle } = props;

  function openAddArticle() {
    setAddArticle(!addArticle);
  }

  return (
    <div className="article-display">
      <div className="button-container-right">
        <button type="button" onClick={openAddArticle}>
          Add Article
        </button>
      </div>
      {articles.map((article) => (
        <Article
          key={article.id}
          title={article.title}
          description={article.description}
          usersLiked={article.usersLiked}
          usersDisliked={article.usersDisliked}
        />
      ))}
    </div>
  );
}

export default ShowArticles;
