import React from 'react';
import './ArticleDisplay.css';
import AddArticle from '../AddArticle/AddArticle';
import ShowArticles from '../ShowArticles/ShowArticles';

function ArticleDisplay(props) {
  const { articles, addArticle, setAddArticle } = props;

  return (
    <div>
      <div>
        {addArticle ? (
          <AddArticle addArticle={addArticle} setAddArticle={setAddArticle} />
        ) : (
          <ShowArticles
            articles={articles}
            addArticle={addArticle}
            setAddArticle={setAddArticle}
          />
        )}
      </div>
    </div>
  );
}

export default ArticleDisplay;
