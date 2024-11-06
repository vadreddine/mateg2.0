"use client"
import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default Home;