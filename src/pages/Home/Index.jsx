import { Link } from 'react-router-dom';
import { useUser } from '../../context/userContext';
import Card from '../../components/CardBase/Index'; 
import { useLoginContext } from '../../context/loginContext';
import './Style.css'; 

const Home = () => {
    const { userID } = useUser();
    const { isLoggedIn, userName, handleLoginClick } = useLoginContext();

    return (
        <div className="home">
            {( !userID ) && (
                <div className="default-home">
                    <h1>Welcome to VerseMark!</h1>
                    <li>Create custom Bible reading plans</li>
                    <li>Add custom notes or links to relevant content</li>
                    <li>Share with your Bible study group</li>
                </div>
            )}
            {( userID ) && (
                <div className="user-home">
                    <Link to="/library" className="card-link">
                        <Card>
                            <h2>Library</h2>
                            <p>Access your saved passages and notes.</p>
                        </Card>
                    </Link>
                    <Link to="/library/new" className="card-link">
                        <Card>
                            <h2>Create New Plan</h2>
                            <p>Start a new reading or study plan.</p>
                        </Card>
                    </Link>
                </div>
            )}
        </div>
    );
};  

export default Home;