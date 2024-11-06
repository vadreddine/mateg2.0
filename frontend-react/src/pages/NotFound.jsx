// src/pages/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mt-5 text-center">
      <h2>404 - Page Non Trouvée</h2>
      <p>Désolé, la page que vous recherchez n'existe pas.</p>
      <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </div>
  );
};

export default NotFound;
