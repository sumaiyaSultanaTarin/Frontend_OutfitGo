import axios from 'axios';
import { logout } from './auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  // Handle token expiration & auto-logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout(); 
    }
    return Promise.reject(error);
  }
);
export default api;


