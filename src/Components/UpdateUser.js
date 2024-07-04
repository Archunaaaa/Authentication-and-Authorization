import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './UserTable.css';

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { username } = useParams(); 

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:8080/api/user/getUser/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        
        const user = response.data;
        setUserId(user.Details.userId);
        setFullName(user.Details.userName);
        setEmail(user.Details.email);
        setMobileNo(user.Details.mobileNo);
        setRole(user.Authorities[0].authority);
      } catch (error) { 
        console.error('Error fetching user data:', error);
        setMessage('Error fetching user data');
      }
    };

    fetchUserData();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const token = localStorage.getItem('token');
    const userData = {
      userName: fullName,
      email: email,
      mobileNo: mobileNo,
      password: password,
      confirmPassword: confirmPassword,
      userRole: role,
      userId: userId,
    };

    try {
      await axios.put(`http://localhost:8080/api/user/update`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('User updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Error updating user');
    }
  };

  const roles = [
    { label: 'User', value: 'USER' },
    { label: 'Admin', value: 'ADMIN' },
  ];

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Update User</h2>
        <div className="p-field">
          <label htmlFor="userId">User ID</label>
          <InputText id="userId" value={userId} disabled />
        </div>
        <div className="p-field">
          <label htmlFor="fullName">User Name</label>
          <InputText id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="p-field">
          <label htmlFor="mobileNo">Mobile Number</label>
          <InputText id="mobileNo" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required />
        </div>
        <div className="p-field">
          <label htmlFor="password">Password</label>
          <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} required toggleMask />
        </div>
        <div className="p-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Password id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required toggleMask />
        </div>
        <div className="p-field">
          <label htmlFor="role">Role</label>
          <Dropdown id="role" value={role} options={roles} onChange={(e) => setRole(e.value)} placeholder="Select Role" required />
        </div>
        <Button type="submit" label="Update" />
        {message && <Message severity="info" text={message} />}
      </form>
    </div>
  );
};

export default UpdateUser;