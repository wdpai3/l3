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

    // Pobieranie użytkowników
    const fetchUsers = () => {
        axios
            .get('http://localhost:8000/api/users/')
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
            .post('http://localhost:8000/api/users/', newUser)
            .then(() => {
                fetchUsers(); // Odśwież listę użytkowników
                setNewUser({ first_name: '', last_name: '', role: '' }); // Wyczyść formularz
            })
            .catch(error => console.error('Error adding user:', error));
    };

    // Usuwanie użytkownika
    const handleDeleteUser = (id: number) => {
        axios
            .delete(`http://localhost:8000/api/users/${id}`)
            .then(() => {
                fetchUsers(); // Odśwież listę użytkowników
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    // Funkcja renderująca listę użytkowników
    const displayItems = (items: any[]) => {
        return items.map((item) => (
            <li key={item.id} className="team-members-item">
                <div>
                    <p><strong>{item.first_name} {item.last_name}</strong></p>
                    <p className="gray-text">{item.role}</p>
                </div>
                <button
                    className="delete-button"
                    onClick={() => handleDeleteUser(item.id)}
                >
                    🗑️
                </button>
            </li>
        ));
    };

    return (
        <div className="container">
            <h1>Let's Level Up Your Brand Together</h1>
            <form onSubmit={handleAddUser}>
                <label htmlFor="first_name">First name</label>
                <input
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    value={newUser.first_name}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="last_name">Last name</label>
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    value={newUser.last_name}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="role">Role</label>
                <select
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled>Role</option>
                    <option value="Manager">Manager</option>
                    <option value="CTO">CTO</option>
                    <option value="Development Lead">Development Lead</option>
                    <option value="Product Designer">Product Designer</option>
                </select>

                <div className="privacy-policy">
                    <input type="checkbox" id="agree" name="agree" required />
                    <label htmlFor="agree">
                        You agree to our friendly <a href="#">privacy policy</a>.
                    </label>
                </div>

                <button type="submit" className="submit-button">Submit</button>
            </form>

            <div className="team-list">
                <ul id="team-members">
                    {displayItems(users)}
                </ul>
            </div>
        </div>
    );
};

export default UserList;
