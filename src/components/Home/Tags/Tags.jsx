import React from 'react';
import { connect } from 'react-redux';
import agent from '../../../agent';
import styles from './Tags.module.css';

const mapStateToProps = (state) => ({
  currentTag: state.articleList.tag,
});

function Tags({ tags, onClickTag, currentTag }) {
  const handleClick = (ev, tag) => {
    ev.preventDefault();
    onClickTag(
      tag,
      (page) => agent.Articles.byTag(tag, page),
      agent.Articles.byTag(tag),
    );
  };

  const className = (tag) =>
    `${styles.tag} ${currentTag === tag ? styles.active : ''} `;

  if (tags) {
    return (
      <section className={styles.tagList}>
        {tags.map((tag) => (
          <button
            className={className(tag)}
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

export default connect(mapStateToProps)(Tags);
