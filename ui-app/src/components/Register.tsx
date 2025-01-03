import React, { useState } from 'react';
import axios from 'axios';
import "../register.css";

const Register = () => {
    // Pola jako oddzielne stany
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Przechowuje wartości pól formularza
    const [message, setMessage] = useState(''); // Przechowuje komunikaty dla użytkownika

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Walidacja długości hasła
        if (password.length < 8) {
            setMessage('Hasło musi mieć co najmniej 8 znaków.');
            return;
        }

        // Walidacja zgodności haseł
        if (password !== confirmPassword) {
            setMessage('Hasło i potwierdzenie hasła muszą być takie samo.');
            return;
        }

        try {
            await axios.post('http://localhost:8000/api/register/', { username, email, password }); // Wysyła dane rejestracji do API 
            setMessage('Zarejestrowano pomyślnie!'); // Komunikat o sukcesie
        } catch (error) {
            console.error('Błąd podczas rejestracji:', error);
            setMessage('Rejestracja nie powiodła się. Spróbuj ponownie.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Nazwa użytkownika:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label htmlFor="password">Hasło:</label>
            <input
                type="password"
                id="password"
                placeholder="min 8 znaków"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
            />

            <label htmlFor="confirmPassword">Potwierdź hasło:</label>
            <input
                type="password"
                id="confirmPassword"
                placeholder="min 8 znaków"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                required
            />

            {/* Komunikat dla użytkownika */}
            {message && <p className="message">{message}</p>}

            <div className="privacy-policy">
                <input type="checkbox" id="agree" required />
                <label htmlFor="agree">
                    Zgadzam się z <a href="#">polityką prywatności</a>.
                </label>
            </div>

            <button type="submit">Zarejestruj się</button>
        </form>
    );
};

export default Register;
