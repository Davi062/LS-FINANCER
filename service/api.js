import axios from 'axios';

// Configuração global do axios
export const API = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

