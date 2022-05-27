import React from 'react';

function ListErrors({ errors }) {
  return errors ? (
    <ul className="error-messages">
      {Object.keys(errors).map((key) => (
        <li key={key}>
          {key} {errors[key]}
        </li>
      ))}
    </ul>
  ) : null;
}

export default ListErrors;
