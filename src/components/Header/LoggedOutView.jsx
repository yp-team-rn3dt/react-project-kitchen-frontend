import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import IconHome from '../Icons/IconHome';
import styles from './LoggedOutView.module.css';
import IconEntrance from '../Icons/IconEntrance';

const LoggedOutView = ({ currentUser }) => {
  const { pathname } = useLocation();
  const isActiveHome = pathname === '/';
  const isActiveRegister = pathname === '/register';

  if (!currentUser) {
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
        {/*  <li className="nav-item">  */}
        {/*   <Link to="/login" className="nav-link"> */}
        {/*    Sign in */}
        {/*  </Link> */}
        {/* </li> */}
        <li className={styles.navItem}>
          <IconEntrance stroke={isActiveRegister ? '#F2F2F3' : '#8585AD'} />
          <Link
            to="/register"
            className={isActiveRegister ? styles.navLinkActive : styles.navLink}
          >
            Войти
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

export default LoggedOutView;
