import axios from 'axios';

// Tworzymy instancję Axiosa
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Dodajemy interceptor dla każdego żądania
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token'); // Pobierz token z sessionStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Dodaj nagłówek Authorization
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
