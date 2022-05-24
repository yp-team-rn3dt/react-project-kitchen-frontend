import React from 'react';
import agent from '../../agent';

function Tags(props) {
  const { tags } = props;
  if (tags) {
    return (
      <div className="tag-list">
        {tags.map((tag) => {
          const handleClick = (ev) => {
            ev.preventDefault();
            props.onClickTag(
              tag,
              (page) => agent.Articles.byTag(tag, page),
              agent.Articles.byTag(tag),
            );
          };

          return (
            <button
              className="tag-default tag-pill"
              key={tag}
              onClick={handleClick}
            >
              {tag}
            </button>
          );
        })}
      </div>
    );
  }
  return <div>Loading Tags...</div>;
}

export default Tags;
