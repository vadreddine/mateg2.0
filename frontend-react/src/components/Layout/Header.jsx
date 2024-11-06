// src/components/Layout/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MATEG 2.0</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Accueil</Link>
              </li>
              {auth && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Tableau de bord</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profil</Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav">
              {!auth ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">Connexion</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Inscription</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>Déconnexion</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
