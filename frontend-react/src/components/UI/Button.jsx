// src/components/UI/Button.jsx

import React from 'react';

const Button = ({ type = 'button', variant = 'primary', children, ...rest }) => {
  return (
    <button type={type} className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
