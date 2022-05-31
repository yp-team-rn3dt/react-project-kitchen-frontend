import React from 'react';
import agent from '../../../agent';
import styles from './Tags.module.css';

function Tags({ tags, onClickTag }) {
  if (tags) {
    return (
      <section className={styles.tagList}>
        {tags.map((tag) => {
          const handleClick = (ev) => {
            ev.preventDefault();
            onClickTag(
              tag,
              (page) => agent.Articles.byTag(tag, page),
              agent.Articles.byTag(tag),
            );
          };

          return (
            <button
              className={styles.tag}
              key={tag}
              onClick={handleClick}
              type="button"
            >
              {tag}
            </button>
          );
        })}
      </section>
    );
  }
  return <section>Загрузка...</section>;
}

export default Tags;
