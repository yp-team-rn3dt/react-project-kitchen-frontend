import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import styles from './LoggedOutView.module.css';
import IconHome from '../Icons/IconHome';
import IconNewPost from '../Icons/IconNewPost';
import IconSettings from '../Icons/IconSettings';
import IconAvatar from '../Icons/IconAvatar';

const LoggedInView = ({ currentUser }) => {
  const { pathname } = useLocation();
  const isActiveHome = pathname === '/';
  const isNewPost = pathname === '/editor';
  const isSettings = pathname === '/settings';
  const isUser = pathname === `/@${currentUser?.username}`;

  if (currentUser) {
    return (
      <ul className={styles.navbarNav}>
        <li className={styles.navItem}>
          <IconHome stroke={isActiveHome ? '#F2F2F3' : '#8585AD'} />
          <Link
            to="/"
            className={isActiveHome ? styles.navLinkActive : styles.navLink}
          >
            Главная
          </Link>
        </li>

        <li className={styles.navItem}>
          <IconNewPost stroke={isNewPost ? '#F2F2F3' : '#8585AD'} />
          <Link
            to="/editor"
            className={isNewPost ? styles.navLinkActive : styles.navLink}
          >
            Новая запись
          </Link>
        </li>

        <li className={styles.navItem}>
          <IconSettings stroke={isSettings ? '#F2F2F3' : '#8585AD'} />
          <Link
            to="/settings"
            className={isSettings ? styles.navLinkActive : styles.navLink}
          >
            Настройки
          </Link>
        </li>

        <li className={styles.navItem}>
          <IconAvatar />
          <Link
            to={`/@${currentUser.username}`}
            className={isUser ? styles.navLinkActive : styles.navLink}
          >
            {currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

export default LoggedInView;
