// src/components/Layout/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} MATEG 2.0. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
