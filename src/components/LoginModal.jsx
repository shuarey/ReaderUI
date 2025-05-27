import { useState, useEffect } from 'react';
import { useUser } from '../context/userContext';
import { useErrorContext } from '../context/errorContext';
import { DynamicIcon } from './DynamicIcon';

const LoginModal = ({ onClose, onLoginSuccess } = {}) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const urlPrefix = import.meta.env.VITE_API_URL;

    const handleError = (error) => {
        setErrorText(error);
        setShowModal(true);
    }
    const handleClose = () => {
        onClose();
    };
    const handleLoginSuccess = (userName) => {
        onLoginSuccess(userName);
    };
    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleFormToggle = (isRegistering) => {
        setEmail('');
        setPassword('');
        setShowPassword(false);
        setConfirmPassword('');
        setIsRegistering(isRegistering);
    }

    const { setErrorText, setShowModal } = useErrorContext();
    const {setUserID} = useUser();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegistering) {
            // Registration form validation
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(email)) {
                handleError('Invalid email format');
                return;
            }

            if (password !== confirmPassword) {
                handleError('Passwords do not match');
                return;
            }

            try {
                const url = `${urlPrefix}`+'accountuser/register';
                const response = await fetch(url, {
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
                    handleError('Registration failed');
                    return;
                }

                setIsRegistering(false);
            } catch (err) {
                console.log(err.message);
                handleError();
            }
        } 
        else {
            try {
                const url = `${urlPrefix}accountuser/login`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password
                    }),
                });

                if (!response.ok) {
                    handleError('Invalid username or password');
                    return;
                }

                const data = await response.json();
                const { id, user_name } = data;
                let userName = '';
                if ( user_name )
                    userName = `${user_name}`;
                else
                    userName = email;
                setUserID(id);
                handleLoginSuccess(userName);
            } catch (err) {
                console.log(err.message);
                handleError();
            }
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center">
            <div className="bg-white px-7 py-6 rounded-lg shadow-lg w-full max-w-[350px]">
                <div className="flex justify-between">
                    <h2 className='text-2xl py-2'>{isRegistering ? 'Register' : 'Log In'}</h2>
                    <button className='cursor-pointer' 
                            onClick={handleClose}>
                            <DynamicIcon icon="XCircleIcon" className='w-6 h-6 text-primary hover:text-primary/70' outline='false' />
                    </button>
                </div>
                <div className="border-t bg-black/50"></div>
                <form className='py-2 mb-1'>
                    <div>
                        <input type="hidden" value="prayer" />
                    </div>
                    <div className='flex mb-2 justify-between w-full bg-gray-200/60 rounded-lg'>
                        <input
                            type="text"
                            id="email"
                            className="py-2.5 ps-2 pe-2 w-full max-h-10 outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Email Address'
                            autoComplete='off'
                        />
                    </div>
                        <div className='flex mb-2 justify-between w-full bg-gray-200/60 rounded-lg'>
                            <input 
                                id="password" 
                                type={showPassword ? 'text' : 'password'}
                                className="py-2.5 ps-2 pe-2 w-full max-h-10 outline-none" 
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete='current-password'
                            />
                            <button onClick={handleShowPassword}>
                                <DynamicIcon icon="EyeIcon" className='w-6 h-5 text-black/90 hover:text-black/70 pe-2' outline='false' />
                            </button>
                        </div>
                    {isRegistering && (
                        <div className='flex mb-2 justify-between w-full bg-gray-200/60 rounded-lg'>
                            <input 
                                id="confirmPassword" 
                                type={showPassword ? 'text' : 'password'}
                                className="py-2.5 ps-2 pe-2 w-full max-h-10 outline-none" 
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <button /* data-sitekey="6Lc71y4rAAAAAA2sw4hU7JI7Jpksu1Pg2p3uu-r4" */
                            // data-callback='onSubmit' 
                            // data-action='submit'
                            className='py-2 p-2 block bg-primary hover:bg-primary/70 cursor-pointer text-white rounded-lg w-full h-full'
                            onClick={handleSubmit}>
                            {isRegistering ? 'Register' : 'Submit'}
                    </button>
                </form>
                <div className="border-b border-black/70"></div>
                <div className='text-[9px] justify-items-center py-2'>
                    <h2>
                        {isRegistering ? (
                            <>
                                Already have an account?{' '}
                                <a className='text-blue-500' href="#" onClick={() => handleFormToggle(false)}>
                                    Login here
                                </a>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <a className='text-blue-500' href="#" onClick={ () => handleFormToggle(true)}>
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