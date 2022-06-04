import React from 'react';
import styles from './Banner.module.css';

const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <div className={styles.banner}>
      <div className="container">
        <h1 className={styles.logoFont}>{appName}</h1>
        <p className={styles.subTitle}>Место, где готовится новый опыт</p>
      </div>
    </div>
  );
};

export default Banner;
