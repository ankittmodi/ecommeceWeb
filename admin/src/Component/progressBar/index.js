import React from 'react';
import './progress.css';

const ProgressBar = ({ value, type }) => {
  return (
    <div className="progress">
      <div
        className={`bar ${type === 'success' ? 'success-color' : ''} && ${type === 'error' ? 'error-color' : ''} && ${type === 'warning' ? 'warning-color' : ''}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
