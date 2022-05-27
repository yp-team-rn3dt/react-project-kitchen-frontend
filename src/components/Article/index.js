import React from 'react';
import { connect } from 'react-redux';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import agent from '../../agent';
import CommentContainer from './CommentContainer';
import ArticleMeta from './ArticleMeta';
import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
} from '../../constants/actionTypes';

const mapStateToProps = (state) => ({
  ...state.article,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: ARTICLE_PAGE_UNLOADED }),
});

class Article extends React.Component {
  UNSAFE_componentWillMount() {
    const { onLoad, match } = this.props;
    onLoad(
      Promise.all([
        agent.Articles.get(match.params.id),
        agent.Comments.forArticle(match.params.id),
      ]),
    );
  }

  componentWillUnmount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onUnload();
  }

  render() {
    const { article, currentUser, comments, commentErrors, match } = this.props;
    if (!article) {
      return null;
    }

    const markup = {
      __html: DOMPurify.sanitize(marked.parse(article.body)),
    };
    const canModify =
      currentUser && currentUser.username === article.author.username;
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>
            <ArticleMeta article={article} canModify={canModify} />
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup} />

              <ul className="tag-list">
                {article.tagList.map((tag) => (
                  <li className="tag-default tag-pill tag-outline" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          <div className="article-actions" />

          <div className="row">
            <CommentContainer
              comments={comments || []}
              errors={commentErrors}
              slug={match.params.id}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
