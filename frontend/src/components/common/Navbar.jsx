import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';


function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
        }
    };

    return (
        <nav>
            <div className="navbar-logo"></div> {/* Logo container */}
            <ul>
                {!isAuthenticated && <li><Link to="/">Login</Link></li>}
                {!isAuthenticated && <li><Link to="/register">Register</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAuthenticated && <li><Link to="/files">File</Link></li>}
                {isAuthenticated && <li><Link to="/upload-file">UploadFile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {isAdmin && <li><Link to="/admin/subject-management">Faculty</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;
