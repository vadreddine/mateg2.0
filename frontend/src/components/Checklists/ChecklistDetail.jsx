// src/components/Checklists/ChecklistDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../UI/Loader';

const ChecklistDetail = () => {
  const { id } = useParams();
  const [checklist, setChecklist] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchChecklist = async () => {
    try {
      const response = await api.get(`/qhse/checklists/${id}`);
      setChecklist(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de la checklist', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChecklist();
  }, [id]);

  if (loading) return <Loader />;

  if (!checklist) return <p>Checklist non trouvée.</p>;

  return (
    <div className="container mt-5">
      <h2>{checklist.name}</h2>
      <p><strong>Fréquence :</strong> {checklist.frequency}</p>
      <p><strong>Description :</strong> {checklist.description || 'N/A'}</p>
      <h4>Items</h4>
      <ul className="list-group">
        {checklist.items.map(item => (
          <li key={item.id} className="list-group-item">
            <strong>{item.number}.</strong> {item.description} <em>({item.type})</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChecklistDetail;
  