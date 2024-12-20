import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import paska nawigacji
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import UserList from './UserList';

function App() {
    return (
        <BrowserRouter>
            <Navbar /> {/* Pasek nawigacji statycznie widoczny */}
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

