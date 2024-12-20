import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom'; // Hook do nawigacji
import '../login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook do przekierowania

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Rozpoczęcie logowania...');
            const response = await axiosInstance.post('login/', { username, password });
            console.log('Odpowiedź z serwera:', response.data);
            sessionStorage.setItem('token', response.data.access);
            console.log('Token zapisany, przekierowanie na stronę główną...');
            navigate('/users'); // Próba przekierowania
            console.log('Przekierowano na stronę główną!');
        } catch (error) {
            console.error('Błąd podczas logowania:', error);
        }
    };
    

    return (
        <form onSubmit={handleLogin}>
            <h2>Logowanie</h2>
            <label htmlFor="username">Nazwa użytkownika:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label htmlFor="password">Hasło:</label>
            <input
                type="password"
                id="password"
                placeholder="min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Zaloguj się</button>
        </form>
    );
};

export default Login;
