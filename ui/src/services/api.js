import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });  // ✅ Add /api

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;

// Export login and register functions
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (userData) => API.post('/auth/register', userData);
