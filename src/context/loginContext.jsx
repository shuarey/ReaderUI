import { createContext, useState, useContext } from 'react';
import LoginModal from '../components/LoginModal';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userName, setUserName] = useState(null);

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

    const handleLogoutClick = () => {
        setIsLoggedIn(false);
        setUserName(null);
    }

    return (
        <LoginContext.Provider
            value={{
                isLoggedIn,
                userName,
                showModal,
                handleLoginClick,
                handleCloseModal,
                handleLoginSuccess,
                handleLogoutClick
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

export const useLoginContext = () => useContext(LoginContext);