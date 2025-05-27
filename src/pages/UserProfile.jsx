import { useState, useEffect } from 'react';
import { useUser } from '../context/userContext';

const UserProfile = () => {
    const urlPrefix = import.meta.env.VITE_API_URL;
    const { userID } = useUser();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const url = `${urlPrefix}`+'accountuser?user_id='+`${userID}`;
        const response = fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        response
            .then((res) => res.json())
            .then((data) => {
                setUserData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
        console.log('i fire once');
    }, []);

    const iAmAFrog = userData && userData.first_name && userData.last_name ? `${userData.first_name} ${userData.last_name}` : 'User';
    const userEmail = userData && userData.email ? userData.email : 'No email provided';

return (
  <div className="flex flex-col items-center max-w-sm rounded-2xl shadow-xl p-6 border-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{iAmAFrog}</h3>
      <div className="mt-4 flex justify-center space-x-4">
        <a href="#" className="text-blue-500 hover:text-blue-600">{userEmail}</a>
      </div>
  </div>
  );
};

export default UserProfile;