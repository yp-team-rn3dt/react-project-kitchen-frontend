import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, currentUser, slug }) => (
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

export default CommentList;
