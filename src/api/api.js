// carehub-frontend/src/api/api.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'; 

const api = axios.create({
  baseURL: API_URL, 
});

// 🚨 INTERCEPTOR: Garante que o token seja anexado a cada requisição 🚨
api.interceptors.request.use(
    (config) => {
        // Tenta buscar o token armazenado
        const token = localStorage.getItem('firebaseToken');
        
        if (token) {
            // Define o cabeçalho Authorization no formato Bearer
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // Se não houver token, remova qualquer cabeçalho Authorization antigo
            delete config.headers.Authorization;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;