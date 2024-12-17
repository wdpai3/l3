import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import paska nawigacji
import Register from './components/Register';
import Login from './components/Login';
import UserList from './UserList';

function App() {
    return (
        <BrowserRouter>
            <Navbar /> {/* Pasek nawigacji statycznie widoczny */}
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/" element={<UserList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
