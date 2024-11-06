// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si vous souhaitez mesurer les performances de votre application, passez une fonction à reportWebVitals (par exemple : reportWebVitals(console.log))
reportWebVitals();
