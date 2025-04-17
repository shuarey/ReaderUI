import React, { useState } from 'react';
import { useUser } from '../../context/userContext';
import './Style.css';

const LoginModal = ({ onClose, onLoginSuccess }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [error, setError] = useState('');

    const {setUserID} = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegistering) {
            // Registration form validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsValidEmail(emailRegex.test(email));

            if ( !isValidEmail ) {
                setError('Invalid email format');
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            try {
                const response = await fetch('http://localhost:50534/api/accountuser/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        first_name,
                        last_name,
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
                const response = await fetch('http://localhost:50534/api/accountuser/login', {
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

                onLoginSuccess(first_name, last_name);
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
                    {isRegistering && (
                        <>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                console.log(email);
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
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
                                type="text"
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
                <button className="close-button" onClick={onClose}>
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