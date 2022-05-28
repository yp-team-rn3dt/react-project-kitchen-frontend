import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import { ADD_COMMENT } from '../../constants/actionTypes';

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (payload) => dispatch({ type: ADD_COMMENT, payload }),
});

class CommentInput extends React.Component {
  constructor() {
    super();
    this.state = {
      body: '',
    };

    this.setBody = (ev) => {
      this.setState({ body: ev.target.value });
    };

    this.createComment = (ev) => {
      ev.preventDefault();
      const { slug, onSubmit } = this.props;
      const { body } = this.state;
      const payload = agent.Comments.create(slug, { body });
      this.setState({ body: '' });
      onSubmit(payload);
    };
  }

  render() {
    const { body } = this.state;
    const { currentUser } = this.props;
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            value={body}
            onChange={this.setBody}
            rows="3"
          />
        </div>
        <div className="card-footer">
          <img
            src={currentUser.image}
            className="comment-author-img"
            alt={currentUser.username}
          />
          <button className="btn btn-sm btn-primary" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
