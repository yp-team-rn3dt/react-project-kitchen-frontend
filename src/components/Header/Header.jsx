import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import LoggedInView from './LoggedInView';
import LoggedOutView from './LoggedOutView';

const Header = ({ appName, currentUser }) => (
  <nav className={styles.navbar}>
    <div className={styles.container}>
      <Link to="/" className={styles.navbarBrand}>
        {appName}
      </Link>

      <LoggedOutView currentUser={currentUser} />

      <LoggedInView currentUser={currentUser} />
    </div>
  </nav>
);

export default Header;
