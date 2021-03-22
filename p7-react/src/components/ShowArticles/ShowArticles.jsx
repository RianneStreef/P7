import React from 'react';
import Article from '../Article/Article';

function ShowArticles(props) {
  const {
    articles,
    setArticle,
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
            <p className="hide-mobile">Add Article</p>
            <i className="hide-desktop fas fa-folder-plus" />
          </>
        </button>
      </div>
      <Article
        articles={articles}
        setArticle={setArticle}
        currentUser={currentUser}
      />
    </div>
  );
}

export default ShowArticles;
