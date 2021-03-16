import React from 'react';
import Article from '../Article/Article';

function ShowArticles(props) {
  const {
    articles,
    addArticle,
    setAddArticle,
    currentUser,
    setCurrentUser,
  } = props;

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
          articles={articles}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      ))}
    </div>
  );
}

export default ShowArticles;
