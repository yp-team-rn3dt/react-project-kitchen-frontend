import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import { DELETE_COMMENT } from '../../constants/actionTypes';

const mapDispatchToProps = (dispatch) => ({
  onClick: (payload, commentId) =>
    dispatch({ type: DELETE_COMMENT, payload, commentId }),
});

function DeleteButton({ slug, commentId, onClick, show }) {
  const del = () => {
    const payload = agent.Comments.delete(slug, commentId);
    onClick(payload, commentId);
  };

  if (show) {
    return (
      <span className="mod-options">
        <i
          role="button"
          tabIndex={0}
          className="ion-trash-a"
          onMouseUp={del}
          label="delete button"
        />
      </span>
    );
  }
  return null;
}

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
