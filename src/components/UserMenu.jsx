import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { useLoginContext } from '../context/loginContext';

function UserMenu() {
    const { userID } = useUser();
    const { userName, setIsLoggedIn, setUserName } = useLoginContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleToggleClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogoutClick = () => {
        setIsLoggedIn(false);
        setUserName(null);
    };

    return (
        <div className="user-menu">
            <nav>
                <button type="button" onClick={handleToggleClick} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                    {userName[0].toUpperCase()}
                    <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </button>
                {dropdownOpen && (
                    <div className="user-menu-dropdown">
                        <Link to={`/user/${userID}`} className="user-menu-link">My Profile</Link>
                        <button onClick={handleLogoutClick} className="user-menu-link">Logout</button>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default UserMenu;