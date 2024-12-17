import React, { useState } from 'react';
import axios from 'axios';
import "../register.css"

const Register = () => {
    // Pola jako oddzielne stany
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        // Zablokowanie domyślnej funkcjonalności SUBMIT formularza
        e.preventDefault();

        // const formData = { username, email, password };

        try {
             await axios.post('http://localhost:8000/api/register/', { username, email, password });
            // Dodanie notyfikacji zamiast alertu
            console.log('Rejestracja zakończona sukcesem!');
        } catch (error) {
            console.error('Błąd podczas rejestracji:', error);
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
                placeholder="min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

<label htmlFor="confirmPassword">Confirm password</label>
            <input
                type="password"
                id="confirmPassword"
                placeholder="min 8 characters"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />

            <div className="privacy-policy">
                <input type="checkbox" id="agree" required />
                <label htmlFor="agree">
                    You agree to our friendly <a href="#">privacy policy</a>.
                </label>
            </div>

            <button type="submit">Zarejestruj się</button>
        </form>
    );
};

export default Register;

// import React, { useState } from 'react';
// import axios from 'axios';
// import '../register.css';

// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:8000/api/register/', { username, email, password });
//             setMessage('Rejestracja zakończona sukcesem!');
//         } catch (error) {
//             console.error('Błąd rejestracji:', error);
//             setMessage('Błąd rejestracji.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Rejestracja</h2>
//             <label>Nazwa użytkownika:</label>
//             <input type="text" onChange={(e) => setUsername(e.target.value)} required />

//             <label>Email:</label>
//             <input type="email" onChange={(e) => setEmail(e.target.value)} required />

//             <label>Hasło:</label>
//             <input type="password" onChange={(e) => setPassword(e.target.value)} required />

//             <button type="submit">Zarejestruj się</button>
//             {message && <p>{message}</p>}
//         </form>
//     );
// };

// export default Register;
