import axios from 'axios';

const API = axios.create({ 
    baseURL: 'https://library-back-75i6.onrender.com/api', 
    // withCredentials: true,
});

// Add token automatically if logged in
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

// Export login and register functions
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (userData) => API.post('/auth/register', userData);

export const fetchStudents = () => API.get('/students');

export const issueBook = async (studentId, bookId, returnDate) => {
    const res = await API.post('/books/issue', {
        studentId,
        bookId,
        returnDate,
    });
    return res.data;
};

export const fetchIssues = () => API.get('/issues');

export default API;
