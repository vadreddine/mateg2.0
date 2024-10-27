// src/services/authService.js

import api from './api';

const signup = async (data) => {
  const response = await api.post('/auth/signup', data);
  return response.data;
};

const signin = async (data) => {
  const response = await api.post('/auth/signin', data);
  // Assuming the response includes user data and token
  const { accessToken, ...user } = response.data;
  localStorage.setItem('user', JSON.stringify(user));
  return { ...user, accessToken };
};

export default {
  signup,
  signin,
};
