import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-200 p-4">
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/qhse">QHSE</Link>
          </li>
          <li>
            <Link href="/qhse/checklists/create">Créer Checklist</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;