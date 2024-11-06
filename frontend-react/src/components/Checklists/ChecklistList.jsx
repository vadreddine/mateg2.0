// src/components/Checklists/ChecklistList.jsx

import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Loader from '../UI/Loader';

const ChecklistList = () => {
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChecklists = async () => {
    try {
      const response = await api.get('/qhse/checklists');
      setChecklists(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des checklists', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChecklists();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mt-5">
      <h2>Checklists</h2>
      <Link to="/checklists/create" className="btn btn-primary mb-3">Créer une Checklist</Link>
      {checklists.length === 0 ? (
        <p>Aucune checklist disponible.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Fréquence</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {checklists.map(checklist => (
              <tr key={checklist.id}>
                <td>{checklist.name}</td>
                <td>{checklist.frequency}</td>
                <td>
                  <Link to={`/checklists/${checklist.id}`} className="btn btn-sm btn-info me-2">Voir</Link>
                  <Link to={`/checklists/edit/${checklist.id}`} className="btn btn-sm btn-warning me-2">Modifier</Link>
                  <Link to={`/checklists/fill/${checklist.id}`} className="btn btn-sm btn-success me-2">Remplir</Link>
                  <button className="btn btn-sm btn-danger">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ChecklistList;
