import { Link } from 'react-router-dom';
import { useLoginContext } from '../../context/loginContext';
import UserMenu from '../UserMenu/Index';
import './Style.css';

const Layout = ({ children }) => {
    const { isLoggedIn, userName, handleLoginClick } = useLoginContext();
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
                    {isLoggedIn ? (
                        <div className="layout-header-right">
                            <Link to="/home" className="layout-nav-link">Home</Link>
                            <Link to="/library" className="layout-nav-link">Library</Link>
                            <UserMenu />
                        </div>
                    ) : (
                        <button className="login-button" onClick={handleLoginClick}>
                            {isLoggedIn ? userName[0].toUpperCase ( ) : 'Login'}
                        </button>
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