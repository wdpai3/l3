import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        id: null, // Dodaj ID użytkownika (potrzebne do edycji)
        first_name: '',
        last_name: '',
        role: '',
    });
    const [isEditing, setIsEditing] = useState(false); // Czy edytujemy użytkownika

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

    // Obsługa formularza
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
                setNewUser({ id: null, first_name: '', last_name: '', role: '' }); // Wyczyść formularz
            })
            .catch(error => console.error('Error adding user:', error));
    };

    // Aktualizowanie użytkownika
    const handleUpdateUser = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/users/${newUser.id}/`, newUser)
            .then(() => {
                fetchUsers(); // Odśwież listę użytkowników
                setNewUser({ id: null, first_name: '', last_name: '', role: '' }); // Wyczyść formularz
                setIsEditing(false); // Przełącz na tryb dodawania
            })
            .catch(error => console.error('Error updating user:', error));
    };

    // Wybór użytkownika do edycji
    const handleEditUser = (user: any) => {
        setNewUser(user); // Wypełnij formularz danymi użytkownika
        setIsEditing(true); // Ustaw tryb edycji
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
                <div>
                    <button
                        className="edit-button"
                        onClick={() => handleEditUser(item)} // Przyciskiem rozpoczynamy edycję
                    >
                        ✏️
                    </button>
                    <button
                        className="delete-button"
                        onClick={() => handleDeleteUser(item.id)}
                    >
                        🗑️
                    </button>
                </div>
            </li>
        ));
    };

    return (
        <div className="container">
            <h1>{isEditing ? 'Edit User' : 'Add User'}</h1>
            <form onSubmit={isEditing ? handleUpdateUser : handleAddUser}>
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
                    <option value="" disabled>Select role</option>
                    <option value="Manager">Manager</option>
                    <option value="CTO">CTO</option>
                    <option value="Development Lead">Development Lead</option>
                    <option value="Product Designer">Product Designer</option>
                </select>

                <button type="submit" className="submit-button">
                    {isEditing ? 'Update' : 'Submit'}
                </button>
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
