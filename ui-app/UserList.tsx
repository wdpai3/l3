import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        role: ''
    });

    // Pobieranie użytkowników z backendu
    useEffect(() => {
    // TODO
    }, []);

    // Dodawanie użytkownika
    const handleAddUser = () => {
        axios.post('http://localhost:8000/users/', newUser)
            .then(response => {
            // TODO
            })
            .catch(error => console.error('Error adding user:', error));
    };

    // Usuwanie użytkownika
    const handleDeleteUser = (id) => {
    // TODO
    };

    return (
        <div>
            <h1>Lista użytkowników</h1>
            <ul>
                // TODO użyj users.map
            </ul>
            
            <h2>Dodaj użytkownika</h2> 
             // TODO formularz

            <button onClick={handleAddUser}>Dodaj</button>
        </div>
    );
};

export default UserList;

