import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserTable.css';

const UserTable = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');

      if (!token || !username) {
        setError({ error: { reason: 'Token or username not found in local storage' } });
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/user/getUser/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response headers:', response.headers);

        if (response.headers['content-type'] !== 'application/json') {
          throw new Error('Server did not respond with JSON data');
        }

        setUserData(response.data); // Assuming response.data is the user object
      } catch (err) {
        const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
        setError(err.response?.data || defaultError);
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return (
      <div>
        <p>Error: {error.error?.reason || 'No error message available'}</p>
        <p>Timestamp: {error.timeStamp || 'No timestamp available'}</p>
      </div>
    );
  }

  return (
    <div className="container tab-style">
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <table className="table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData.Details.userName}</td>
                <td>{userData.Details.email}</td>
                <td>{userData.Details.mobileNo}</td>
                <td>{userData.Authorities[0].authority}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserTable;