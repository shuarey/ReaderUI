import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../LoginModal/Index'; 
import './Style.css';

const Layout = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [userName, setUserName] = useState(''); 
    const [showModal, setShowModal] = useState(false);

const handleLoginClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLoginSuccess = (first_name, last_name) => {
        setUserName(first_name + ' ' + last_name);
        setIsLoggedIn(true);
        setShowModal(false);
    };
    
return (
        <div className="layout">
            <header className="layout-header">
                <Link to="/home" className="layout-logo-link">
                    <img src="/bookmark.ico" alt="Logo" className="layout-logo" />
                </Link>
                <h1>
                    <Link to="/home" className="layout-title-link">Versemark</Link>
                </h1>
                <nav className="layout-header-right">
                    <Link to="/home" className="layout-nav-link">Home</Link>
                    <Link to="/library" className="layout-nav-link">Library</Link>
                    <button className="login-button" onClick={handleLoginClick}>
                        {isLoggedIn ? userName : 'Login'}
                    </button>
                    {/* If user context returns an ID, this should point to an account link */}
                    {/* Login Modal */}
                    {showModal && (
                        <LoginModal
                            onClose={handleCloseModal}
                            onLoginSuccess={handleLoginSuccess}
                        />
                    )}
                </nav>
            </header>
            <main className="layout-content">{children}</main>
            <footer className="layout-footer">
                <p>&copy; 2025 Versemark. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;