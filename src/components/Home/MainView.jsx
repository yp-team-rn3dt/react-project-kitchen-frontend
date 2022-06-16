import React from 'react';
import { connect } from 'react-redux';
import ArticleList from '../ArticleList';
import agent from '../../agent';
import { CHANGE_TAB } from '../../constants/actionTypes';

const YourFeedTab = ({ token, tab, onTabClick }) => {
  if (token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    };

    return (
      <li className="nav-item">
        <button
          className={tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}
          type="button"
        >
          Your Feed
        </button>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = ({ tab, onTabClick }) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <button
        className={tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
        type="button"
      >
        Global Feed
      </button>
    </li>
  );
};

const TagFilterTab = ({ tag }) => {
  if (!tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <button className="nav-link active" type="button">
        <i className="ion-pound" /> {tag}
      </button>
    </li>
  );
};

const mapStateToProps = (state) => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) =>
    dispatch({
      type: CHANGE_TAB,
      tab,
      pager,
      payload,
    }),
});

const MainView = ({
  token,
  tab,
  tag,
  onTabClick,
  pager,
  articles,
  loading,
  articlesCount,
  currentPage,
}) => (
  <div>
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <YourFeedTab token={token} tab={tab} onTabClick={onTabClick} />

        <GlobalFeedTab tab={tab} onTabClick={onTabClick} />

        <TagFilterTab tag={tag} />
      </ul>
    </div>

    <ArticleList
      pager={pager}
      articles={articles}
      loading={loading}
      articlesCount={articlesCount}
      currentPage={currentPage}
    />
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
