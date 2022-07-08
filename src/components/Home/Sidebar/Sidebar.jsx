import React from 'react';
import Tags from '../Tags/Tags';

import styles from './Sidebar.module.css';

const Sidebar = ({ tags, onClickTag }) => (
  <section className={styles.sidebar}>
    <h2 className={styles.title}>Популярные теги</h2>

    <Tags tags={tags} onClickTag={onClickTag} />
  </section>
);
export default Sidebar;
