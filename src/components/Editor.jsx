import React from 'react';
import { connect } from 'react-redux';
import ListErrors from './ListErrors/ListErrors';
import agent from '../agent';
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR,
} from '../constants/actionTypes';

const mapStateToProps = (state) => ({
  ...state.editor,
});

const mapDispatchToProps = (dispatch) => ({
  onAddTag: () => dispatch({ type: ADD_TAG }),
  onLoad: (payload) => dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: (tag) => dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: (payload) => dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: () => dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
});

class Editor extends React.Component {
  constructor() {
    super();

    const updateFieldEvent = (key) => (ev) =>
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onUpdateField(key, ev.target.value);

    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');

    this.watchForEnter = (ev) => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        // eslint-disable-next-line react/destructuring-assignment
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = (tag) => () => {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onRemoveTag(tag);
    };

    this.submitForm = (ev) => {
      const { title, description, body, tagList, articleSlug, onSubmit } =
        this.props;

      ev.preventDefault();
      const article = {
        title,
        description,
        body,
        tagList,
      };

      const slug = { slug: articleSlug };
      const promise = articleSlug
        ? agent.Articles.update(Object.assign(article, slug))
        : agent.Articles.create(article);

      onSubmit(promise);
    };
  }

  UNSAFE_componentWillMount() {
    const { match, onLoad } = this.props;
    if (match.params.slug) {
      return onLoad(agent.Articles.get(match.params.slug));
    }
    onLoad(null);
    return undefined;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { match, onLoad, onUnload } = this.props;
    if (match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        onUnload();
        return onLoad(agent.Articles.get(match.params.slug));
      }
      onLoad(null);
    }
    return undefined;
  }

  componentWillUnmount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onUnload();
  }

  render() {
    const { errors, title, description, body, tagInput, tagList, inProgress } =
      this.props;
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ListErrors errors={errors} />

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Article Title"
                      value={title}
                      onChange={this.changeTitle}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="What's this article about?"
                      value={description}
                      onChange={this.changeDescription}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={body}
                      onChange={this.changeBody}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      value={tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter}
                    />

                    <div className="tag-list">
                      {(tagList || []).map((tag, key) => (
                        <span className="tag-default tag-pill" key={tag}>
                          <i
                            role="button"
                            tabIndex={key}
                            className="ion-close-round"
                            onMouseUp={this.removeTagHandler(tag)}
                            label="tag"
                          />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={inProgress}
                    onClick={this.submitForm}
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
