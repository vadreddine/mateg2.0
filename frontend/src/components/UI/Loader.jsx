// src/components/UI/Loader.jsx

import React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );
};

export default Loader;
