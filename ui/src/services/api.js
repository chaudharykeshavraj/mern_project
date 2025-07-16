import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000', // your backend API base URL
});

export const register = (userData) => API.post('/auth/register', userData);
export const login = (credentials) => API.post('/auth/login', credentials);
