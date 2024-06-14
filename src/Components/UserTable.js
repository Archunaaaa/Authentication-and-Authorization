import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './UserTable.css';

const UserTable = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
            Accept: 'application/json',
          },
        });
        setUserData(response.data);
      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = async () => {
    if (userData && userData.Details && userData.Details.userName) {
      const username = userData.Details.userName;

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError({ error: { reason: 'Token not found in local storage' } });
          return;
        }

        const response = await axios.get(`http://localhost:8080/api/user/getUserByName/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;
        navigate(`/edit/${username}`, { state: { userData: user } });
      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
        console.error('Error fetching user data for edit:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (userData && userData.Details && userData.Details.userId) {
      const userId = userData.Details.userId;

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError({ error: { reason: 'Token not found in local storage' } });
          return;
        }

        await axios.delete(`http://localhost:8080/api/user/delete/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        navigate('/deleted');
      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
        console.error('Error deleting user:', error);
      }
    }
  };

  if (error) {
    return (
      <div className="user-table-container">
        <p>Error: {error.error?.reason || 'Unknown error occurred'}</p>
        <p>Timestamp: {error.timeStamp || 'No timestamp available'}</p>
      </div>
    );
  }

  return (
    <div className="user-table-container">
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData.Details.userName}</td>
                <td>{userData.Details.email}</td>
                <td>{userData.Details.mobileNo}</td>
                <td>{userData.Authorities[0].authority}</td>
                <td>
                  <button className="action-button edit-button" onClick={handleEdit}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="action-button delete-button" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
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