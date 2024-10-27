// src/components/Checklists/ChecklistItem.jsx

import React from 'react';

const ChecklistItem = ({ item }) => {
  return (
    <li className="list-group-item">
      <strong>{item.number}.</strong> {item.description}
    </li>
  );
};

export default ChecklistItem;
