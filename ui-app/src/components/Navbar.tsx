import { Link } from 'react-router-dom';
import '../index.css'; // Styl nawigacji

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/home">Home</Link>
            </div>
            <div className="navbar-right">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                {/* <Link to="/">User List</Link> */}
            </div>
        </nav>
    );
};

export default Navbar;

