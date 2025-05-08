import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/userContext';
import { useLoginContext } from '../../context/loginContext';
import './Style.css';

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
                <button onClick={handleToggleClick} className="user-menu-button">
                    {userName[0].toUpperCase()}
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