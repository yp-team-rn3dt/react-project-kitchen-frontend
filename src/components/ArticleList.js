import React from 'react';
import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';

function ArticleList({ articles, pager, articlesCount, currentPage }) {
  if (!articles) {
    return <div className="article-preview">Loading...</div>;
  }

  if (articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <div>
      {articles.map((article) => (
        <ArticlePreview article={article} key={article.slug} />
      ))}

      <ListPagination
        pager={pager}
        articlesCount={articlesCount}
        currentPage={currentPage}
      />
    </div>
  );
}

export default ArticleList;
