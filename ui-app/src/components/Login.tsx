import React, { useState } from 'react';
import axios from 'axios';
import '../login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [newUser, setNewUser] = useState({ first_name: '', last_name: '', role: '' });

    // Logowanie i zapis tokenu
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', { username, password });
            setToken(response.data.access); // Zapis tokenu
            console.log('Logowanie zakończone sukcesem!');
        } catch (error) {
            console.error('Błąd logowania:', error);
        }
    };

    // Dodawanie BusinessUser
    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/business_users/', newUser, {
                headers: { Authorization: `Bearer ${token}` } // Przesyłanie tokenu
            });
            console.log('Użytkownik biznesowy dodany!');
        } catch (error) {
            console.error('Błąd dodawania użytkownika biznesowego:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Logowanie</h2>
                <label>Nazwa użytkownika:</label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} required />

                <label>Hasło:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Zaloguj się</button>
            </form>

            {token && (
                <form onSubmit={handleAddUser}>
                    <h3>Dodaj użytkownika biznesowego</h3>
                    <input
                        type="text"
                        placeholder="Imię"
                        onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Nazwisko"
                        onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Rola"
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        required
                    />
                    <button type="submit">Dodaj użytkownika</button>
                </form>
            )}
        </div>
    );
};

export default Login;



// import React, { useState } from 'react';
// import axios from 'axios';
// import '../login.css';

// const Login = () => {
//     // Pola jako oddzielne stany
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = async (e: React.FormEvent) => {
//         // Zablokowanie domyślnej funkcjonalności SUBMIT formularza
//         e.preventDefault();

//         const credentials = { username, password };

//         try {
//             const response = await axios.post('/api/login/', credentials);
//             // Zapis tokenu w session storage
//             sessionStorage.setItem('token', response.data.access);
//             console.log('Logowanie zakończone sukcesem!');
//         } catch (error) {
//             console.error('Błąd podczas logowania:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleLogin}>
//             <label htmlFor="username">Nazwa użytkownika:</label>
//             <input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//             />

//             <label htmlFor="password">Hasło:</label>
//             <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />

//             <button type="submit">Zaloguj się</button>
//         </form>
//     );
// };

// export default Login;
