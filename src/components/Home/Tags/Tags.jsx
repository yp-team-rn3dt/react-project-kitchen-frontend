import React from 'react';
import agent from '../../../agent';
import styles from './Tags.module.css';

function Tags({ tags, onClickTag }) {
  const handleClick = (ev, tag) => {
    ev.preventDefault();
    onClickTag(
      tag,
      (page) => agent.Articles.byTag(tag, page),
      agent.Articles.byTag(tag),
    );
  };
  if (tags) {
    return (
      <section className={styles.tagList}>
        {tags.map((tag) => (
          <button
            className={styles.tag}
            key={tag}
            onClick={(e) => handleClick(e, tag)}
            type="button"
          >
            {tag}
          </button>
        ))}
      </section>
    );
  }
  return <section>Загрузка...</section>;
}

export default Tags;
