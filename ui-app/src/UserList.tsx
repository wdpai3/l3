import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; 

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        role: '',
    });

    // Funkcja do pobierania użytkowników
    const fetchUsers = () => {
        axios
            .get('http://localhost:8000/users/')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    // Pobranie użytkowników na start
    useEffect(() => {
        fetchUsers();
    }, []);

    // Obsługa formularza dodawania użytkownika
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Dodawanie użytkownika
    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/users/', newUser)
            .then(() => {
                fetchUsers(); // Odśwież listę użytkowników
                setNewUser({ first_name: '', last_name: '', role: '' }); // Wyczyść formularz
            })
            .catch(error => console.error('Error adding user:', error));
    };

    // Usuwanie użytkownika
    const handleDeleteUser = (id: number) => {
        axios
            .delete(`http://localhost:8000/users/${id}`)
            .then(() => {
                fetchUsers(); // Odśwież listę użytkowników
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <div className="container">
            <h1>Lista użytkowników</h1>
            <ul id="team-members">
                {users.map((user: any) => (
                    <li key={user.id} className="team-members-item">
                        <div>
                            <p>
                                <strong>{user.first_name} {user.last_name}</strong>
                            </p>
                            <p className="gray-text">{user.role}</p>
                        </div>
                        <button
                            className="delete-button"
                            onClick={() => handleDeleteUser(user.id)}
                        >
                            🗑️
                        </button>
                    </li>
                ))}
            </ul>

            <h2>Dodaj użytkownika</h2>
            <form onSubmit={handleAddUser}>
                <label htmlFor="first_name">Imię</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Imię"
                    value={newUser.first_name}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="last_name">Nazwisko</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Nazwisko"
                    value={newUser.last_name}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="role">Rola</label>
                <select
                    id="role"
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled>
                        Wybierz rolę
                    </option>
                    <option value="student">Student</option>
                    <option value="teacher">Nauczyciel</option>
                    <option value="admin">Administrator</option>
                </select>

                <button type="submit" className="submit-button">Dodaj</button>
            </form>
        </div>
    );
};

export default UserList;
