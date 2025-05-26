import { createContext, useState, useContext } from 'react';
import ErrorModal from '../components/ErrorModal';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [showErrorModal, setShowModal] = useState(false);
    const [errorText, setErrorText] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <ErrorContext.Provider
            value={{
                errorText,
                showErrorModal,
                handleCloseModal,
                setShowModal,
                setErrorText
            }}
        >
            {showErrorModal && (
                <ErrorModal
                error={errorText}
                onClose={handleCloseModal}
                />
            )}
            {children}
        </ErrorContext.Provider>
    );
};

export const useErrorContext = () => useContext(ErrorContext);