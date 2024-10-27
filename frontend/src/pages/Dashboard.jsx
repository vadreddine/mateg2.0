// src/pages/Dashboard.jsx

import React from 'react';
import ChecklistList from '../components/Checklists/ChecklistList';

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Tableau de bord</h2>
      <ChecklistList />
    </div>
  );
};

export default Dashboard;
