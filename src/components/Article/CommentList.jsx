import React from 'react';
import Comment from './Comment';

function CommentList({ comments, currentUser, slug }) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          comment={comment}
          currentUser={currentUser}
          slug={slug}
          key={comment.id}
        />
      ))}
    </div>
  );
}

export default CommentList;
