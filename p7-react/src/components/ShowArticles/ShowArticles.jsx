import React from 'react';
import Article from '../Article/Article';

function ShowArticles(props) {
  const {
    articles,
    setArticles,
    addArticle,
    setAddArticle,
    currentUser,
  } = props;

  function openAddArticle() {
    setAddArticle(!addArticle);
  }

  return (
    <div className="article-display">
      <div className="button-container-right">
        <button type="button" onClick={openAddArticle}>
          <>
            <p className="text-button hide-mobile">Add Article</p>
            <i className="icon-button hide-desktop fas fa-folder-plus" />
          </>
        </button>
      </div>
      <Article
        articles={articles}
        setArticles={setArticles}
        currentUser={currentUser}
      />
    </div>
  );
}

export default ShowArticles;
