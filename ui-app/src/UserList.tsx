import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosConfig';
import './index.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        id: null,
        first_name: '',
        last_name: '',
        role: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    // Pobieranie użytkowników
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('business_users/');
            setUsers(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania użytkowników:', error);
        }
    };

    // Pobierz użytkowników na start
    useEffect(() => {
        fetchUsers();
    }, []);

    // Obsługa formularza
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Dodawanie użytkownika
    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosInstance.post('business_users/', newUser);
            fetchUsers();
            setNewUser({ id: null, first_name: '', last_name: '', role: '' });
        } catch (error) {
            console.error('Błąd podczas dodawania użytkownika:', error);
        }
    };

    // Aktualizowanie użytkownika
    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`business_users/${newUser.id}/`, newUser);
            fetchUsers();
            setNewUser({ id: null, first_name: '', last_name: '', role: '' });
            setIsEditing(false);
        } catch (error) {
            console.error('Błąd podczas aktualizowania użytkownika:', error);
        }
    };

    // Usuwanie użytkownika
    const handleDeleteUser = async (id: number) => {
        try {
            await axiosInstance.delete(`business_users/${id}/`);
            fetchUsers();
        } catch (error) {
            console.error('Błąd podczas usuwania użytkownika:', error);
        }
    };

    // Funkcja renderująca listę użytkowników
    const displayItems = (items: any[]) => {
        return items.map((item) => (
            <li key={item.id} className="team-members-item">
                <div>
                    <p>
                        <strong>
                            {item.first_name} {item.last_name}
                        </strong>
                    </p>
                    <p className="gray-text">{item.role}</p>
                </div>
                <div>
                    <button className="delete-button" onClick={() => handleDeleteUser(item.id)}>
                        🗑️
                    </button>
                </div>
            </li>
        ));
    };

    return (
        <div className="container">
            <h1>{isEditing ? 'Edytuj użytkownika' : 'Dodaj użytkownika biznesowego'}</h1>
            <form onSubmit={isEditing ? handleUpdateUser : handleAddUser}>
                <label htmlFor="first_name">Imię</label>
                <input
                    type="text"
                    name="first_name"
                    placeholder="Imię"
                    value={newUser.first_name}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="last_name">Nazwisko</label>
                <input
                    type="text"
                    name="last_name"
                    placeholder="Nazwisko"
                    value={newUser.last_name}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="role">Rola</label>
                <select
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled>
                        Wybierz rolę
                    </option>
                    <option value="Manager">Manager</option>
                    <option value="CTO">CTO</option>
                    <option value="Development Lead">Development Lead</option>
                    <option value="Product Designer">Product Designer</option>
                </select>

                <button type="submit" className="submit-button">
                    {isEditing ? 'Zaktualizuj' : 'Dodaj'}
                </button>
            </form>

            <div className="team-list">
                <ul id="team-members">{displayItems(users)}</ul>
            </div>
        </div>
    );
};

export default UserList;
