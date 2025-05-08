import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/userContext';
import './Style.css';

const UserProfile = () => {
    const urlPrefix = process.env.REACT_APP_API_URL;
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
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

return (
    <div>
      <h1>User Profile</h1>
        {userData ? (
            <div>
                <p><strong>First Name:</strong> {userData.first_name}</p>
                <p><strong>Last Name:</strong> {userData.last_name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
            </div>
        ) : (
            <p>Loading user data...</p>
        )}
      <p>This is the user profile page.</p>
    </div>
  );
};

export default UserProfile;