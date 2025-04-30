import React, { createContext, useState, useContext } from 'react';
import LoginModal from '../components/LoginModal/Index';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userName, setUserName] = useState('');

    const handleLoginClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLoginSuccess = (userName) => {
        setIsLoggedIn(true);
        setShowModal(false);
        setUserName(userName);
    };

    return (
        <LoginContext.Provider
            value={{
                isLoggedIn,
                userName,
                showModal,
                handleLoginClick,
                handleCloseModal,
                handleLoginSuccess,
            }}
        >
            {children}
            {showModal && (
                <LoginModal
                    onClose={handleCloseModal}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </LoginContext.Provider>
    );
};

export const useLoginModal = () => useContext(LoginContext);