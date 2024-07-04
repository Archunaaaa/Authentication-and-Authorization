import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const UserTable = () => {
    const [user, setUser] = useState(null);
    const [edit, setEdit] = useState(false);
    const [formValues, setFormValues] = useState({
        userName: '',
        email: '',
        mobileNo: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);

    async function fetchUser(email, token) {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/getUser/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { Authority, Details } = response.data;
            setUser({
                ...Details,
                role: Authority && Authority.length > 0 ? Authority[0].authority : 'No Role',
            });
        } catch (error) {
            console.error('Error fetching user:', error);
            setError(error.message || 'Failed to fetch user data');
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/user/delete/${user.userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/login');
        } catch (error) {
            console.error('Error deleting user:', error);
            setError(error.message || 'Failed to delete user');
        }
    };

    useEffect(() => {
        if (email && token) {
            fetchUser(email, token);
        }
    }, [email, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleEdit = () => {
        setFormValues({
            userName: user.userName,
            email: user.email,
            mobileNo: user.mobileNo,
            password: '',
            confirmPassword: '',
        });
        setEdit(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedUser = {
            userId: user.userId,
            userName: formValues.userName,
            email: formValues.email,
            mobileNo: formValues.mobileNo,
            userRole: user.userRole,
            status: user.status,
            password: formValues.password,
            confirmPassword: formValues.confirmPassword,
        };

        try {
            const response = await axios.put(
                `http://localhost:8080/api/user/update`,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(response.data.Details);
            setEdit(false);
        } catch (err) {
            console.error('Error updating user:', err);
            setError(err.message || 'Failed to update user');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {edit ? (
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleUpdate} className="border p-5 mt-5 bg-light">
                        <div className="mb-2">
                            <label className="form-label">Name</label>
                            <input
                                name="userName"
                                value={formValues.userName}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Email</label>
                            <input
                                id="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Mobile No</label>
                            <input
                                id="mobileNo"
                                name="mobileNo"
                                value={formValues.mobileNo}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formValues.password}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </form>
                </div>
            ) : (
                <div className="w-100 d-flex justify-content-center mt-5 pt-5">
                    <DataTable value={[user]} className="p-datatable-sm" paginator rows={10}>
                        <Column field="userName" header="Name" />
                        <Column field="email" header="Email" />
                        <Column field="mobileNo" header="Mobile No" />
                        <Column header="Action">
                            <button className="btn btn-primary" onClick={handleEdit}>
                                Edit
                            </button>
                            <button className="btn btn-danger m-2" onClick={handleDelete}>
                                Delete
                            </button>
                        </Column>
                    </DataTable>
                </div>
            )}
        </>
    );
};

export default UserTable;
