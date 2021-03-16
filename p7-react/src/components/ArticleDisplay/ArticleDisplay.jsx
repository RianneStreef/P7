import React from 'react';
import './ArticleDisplay.css';
import AddArticle from '../AddArticle/AddArticle';
import ShowArticles from '../ShowArticles/ShowArticles';

function ArticleDisplay(props) {
  const {
    articles,
    setArticles,
    addArticle,
    setAddArticle,
    currentUser,
    setCurrentUser,
  } = props;

  return (
    <div>
      <div>
        {addArticle ? (
          <AddArticle
            addArticle={addArticle}
            setArticles={setArticles}
            setAddArticle={setAddArticle}
          />
        ) : (
          <ShowArticles
            articles={articles}
            setArticles={setArticles}
            addArticle={addArticle}
            setAddArticle={setAddArticle}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
      </div>
    </div>
  );
}

export default ArticleDisplay;
