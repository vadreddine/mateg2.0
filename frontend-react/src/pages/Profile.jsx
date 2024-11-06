// src/pages/Profile.jsx

import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { auth } = useAuth();

  if (!auth) return <p>Chargement...</p>;

  return (
    <div className="container mt-5">
      <h2>Profil Utilisateur</h2>
      <p><strong>Nom d'utilisateur :</strong> {auth.username}</p>
      <p><strong>Email :</strong> {auth.email}</p>
      <p><strong>Rôles :</strong> {auth.roles.join(', ')}</p>
    </div>
  );
};

export default Profile;
