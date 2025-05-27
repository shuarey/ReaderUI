import { Link } from 'react-router-dom';
import { useLoginContext } from '../context/loginContext';
import UserMenu from './UserMenu';
import { BookmarkIcon } from './BookmarkIcon';

const Layout = ({ children }) => {
    const { isLoggedIn, userName, handleLoginClick } = useLoginContext();
return (
    <div className="flex flex-col min-h-screen">
        <header className="bg-primary text-white flex items-center justify-between px-4 py-3">
            <div className='flex items-center gap-2'>
                <Link to="/home"><BookmarkIcon /></Link>
                <h1><Link to="/home" className="text-2xl">Versemark</Link></h1>
            </div>
            <nav className="flex items-center gap-4">
                {isLoggedIn ? (
                    <div className="flex items-end gap-4">
                        <Link to="/home" className="layout-nav-link">Home</Link>
                        <Link to="/library" className="layout-nav-link">Library</Link>
                        <UserMenu />
                    </div>
                ) : (
                    <button className="border-1 rounded-md px-2.5 py-1 opacity-100 shadow-none text-sm normal-case font-light text-white-500 bg-transparent hover:opacity-80 border-current" onClick={handleLoginClick}>
                        {isLoggedIn ? userName[0].toUpperCase ( ) : 'Login'}
                    </button>
                )}
            </nav>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-primary text-white text-xs grid place-items-center p-4">
            <p>2025 Versemark. All rights reserved.</p>
        </footer>
    </div>
    );
};

export default Layout;