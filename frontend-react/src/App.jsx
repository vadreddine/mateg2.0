// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Sidebar from './components/Layout/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import ChecklistForm from './components/Checklists/ChecklistForm';
import ChecklistDetail from './components/Checklists/ChecklistDetail';
import ChecklistList from './components/Checklists/ChecklistList';
import FillChecklist from './components/Checklists/FillChecklist'; // Importer le nouveau composant
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />

            {/* Routes protégées */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/checklists"
              element={
                <PrivateRoute>
                  <ChecklistList />
                </PrivateRoute>
              }
            />
            <Route
              path="/checklists/create"
              element={
                <PrivateRoute>
                  <ChecklistForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/checklists/edit/:id"
              element={
                <PrivateRoute>
                  <ChecklistForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/checklists/:id"
              element={
                <PrivateRoute>
                  <ChecklistDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/checklists/fill/:id"
              element={
                <PrivateRoute>
                  <FillChecklist />
                </PrivateRoute>
              }
            />

            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
