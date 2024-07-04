import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './UserTable.css';

const AdminTable = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const getAllusers = localStorage.getItem('getAllusers');
      if (!token || !getAllusers) {
        setError('Token not found in local storage');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/admin/${getAllusers}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        setError('Error fetching user data');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <Container className="tab-style">
        <Message severity="error" text={error} />
      </Container>
    );
  }

  return (
    <Container className="tab-style">
      <Typography variant="h2" gutterBottom>
        Admin Profile
      </Typography>
      <DataTable value={users} className="p-datatable-sm" paginator rows={10}>
        <Column field="userName" header="User Name" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="mobileNo" header="Mobile Number" sortable />
        <Column field="status" header="Status" sortable />
      </DataTable>
    </Container>
  );
};

export default AdminTable;
