import React from 'react';
import errorCodes from '../services/errorCodes';

const ErrorMessage = ({ error }) => {
  return (
    <div className="error-container">
      { error ? <p className="error">{errorCodes[error] || error}</p> : ''}
    </div>
  );
};

export default ErrorMessage;