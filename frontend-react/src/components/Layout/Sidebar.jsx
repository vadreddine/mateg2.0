// src/components/Layout/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { auth } = useAuth();

  if (!auth) return null;

  return (
    <aside className="sidebar">
      <h5>Menu</h5>
      <ul className="list-unstyled">
        <li>
          <Link to="/checklists">Checklists</Link>
        </li>
        {/* Ajoutez d'autres liens si nécessaire */}
      </ul>
    </aside>
  );
};

export default Sidebar;
