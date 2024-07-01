import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
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

        if (response.headers['content-type'] !== 'application/json') {
          throw new Error('Server did not respond with JSON data');
        }

        setUserData(response.data);
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
      <Container>
        <Alert severity="error">{error.error?.reason || 'No error message available'}</Alert>
        <Typography variant="body2">Timestamp: {error.timeStamp || 'No timestamp available'}</Typography>
      </Container>
    );
  }

  return (
    <Container className="tab-style">
      {userData ? (
        <div>
          <Typography variant="h2" gutterBottom>
            User Profile
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{userData.Details.userName}</TableCell>
                  <TableCell>{userData.Details.email}</TableCell>
                  <TableCell>{userData.Details.mobileNo}</TableCell>
                  <TableCell>{userData.Authorities[0].authority}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <Typography variant="body2">Loading...</Typography>
      )}
    </Container>
  );
};

export default UserTable;
