import React from 'react';
import styles from './ListErrors.module.css';

const ListErrors = ({ errors }) =>
  errors ? (
    <ul className={styles.errorMessage}>
      {Object.keys(errors).map((key) => (
        <li key={key}>Поле не может быть пустым</li>
      ))}
    </ul>
  ) : null;

export default ListErrors;
