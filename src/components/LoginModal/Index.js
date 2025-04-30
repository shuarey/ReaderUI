import React, { useState } from 'react';
import { useUser } from '../../context/userContext';
import './Style.css';

const LoginModal = ({ onClose, onLoginSuccess } = {}) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleClose = () => {
        onClose();
    };
    const handleLoginSuccess = () => {
        onLoginSuccess();
    };

    const {setUserID} = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegistering) {
            // Registration form validation
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(email)) {
                setError('Invalid email format');
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            try {
                const response = await fetch('https://api.versemark.me/accountuser/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Registration failed');
                }

                setError('');
                setIsRegistering(false);
            } catch (err) {
                setError(err.message);
            }
        } 
        else {
            // Login form submission
            try {
                const response = await fetch('https://api.versemark.me/accountuser/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Invalid username or password');
                }

                const data = await response.json();
                const { id, first_name, last_name } = data;
                setUserID(id);
                handleLoginSuccess();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {isRegistering && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="submit-button">
                        {isRegistering ? 'Register' : 'Submit'}
                    </button>
                </form>
                <button className="close-button" onClick={handleClose}>
                    Close
                </button>
                <div className="register-link">
                    <h2>
                        {isRegistering ? (
                            <>
                                Already have an account?{' '}
                                <a href="#" onClick={() => setIsRegistering(false)}>
                                    Login here
                                </a>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <a href="#" onClick={() => setIsRegistering(true)}>
                                    Register here
                                </a>
                            </>
                        )}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;