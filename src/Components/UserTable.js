// import React, { useState, useEffect } from 'react'; 
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Message } from 'primereact/message';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

// const UserTable = () => {
//     const [user, setUser] = useState(null);
//     const [edit, setEdit] = useState(false);
//     const [formValues, setFormValues] = useState({
//         userName: '',
//         email: '',
//         mobileNo: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const navigate = useNavigate();
//     const email = localStorage.getItem('email');
//     const token = localStorage.getItem('token');
//     const [error, setError] = useState(null);

//     async function fetchUser(email, token) {
//         try {
//             const response = await axios.get(`http://localhost:8080/api/user/getUser/${email}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             const { Authority, Details } = response.data;
//             setUser({
//                 ...Details,
//                 role: Authority && Authority.length > 0 ? Authority[0].authority : 'No Role',
//             });
//         } catch (error) {
//             console.error('Error fetching user:', error);
//             setError(error.message || 'Failed to fetch user data');
//         }
//     }

//     const handleDelete = async () => {
//         try {
//             await axios.delete(`http://localhost:8080/api/user/delete/${user.userId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             navigate('/login');
//         } catch (error) {
//             console.error('Error deleting user:', error);
//             setError(error.message || 'Failed to delete user');
//         }
//     };

//     useEffect(() => {
//         if (email && token) {
//             fetchUser(email, token);
//         }
//     }, [email, token]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues({
//             ...formValues,
//             [name]: value,
//         });
//     };

//     const handleEdit = () => {
//         setFormValues({
//             userName: user.userName,
//             email: user.email,
//             mobileNo: user.mobileNo,
//             password: '',
//             confirmPassword: '',
//         });
//         setEdit(true);
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         const updatedUser = {
//             userId: user.userId,
//             userName: formValues.userName,
//             email: formValues.email,
//             mobileNo: formValues.mobileNo,
//             userRole: user.userRole,
//             status: user.status,
//             password: formValues.password,
//             confirmPassword: formValues.confirmPassword,
//         };

//         try {
//             const response = await axios.put(
//                 `http://localhost:8080/api/user/update`,
//                 updatedUser,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             setUser(response.data.Details);
//             setEdit(false);
//         } catch (err) {
//             console.error('Error updating user:', err);
//             setError(err.message || 'Failed to update user');
//         }
//     };

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <>
//             {edit ? (
//                 <div className="d-flex justify-content-center">
//                     <form onSubmit={handleUpdate} className="border p-5 mt-5 bg-light">
//                         <div className="mb-2">
//                             <label className="form-label">Name</label>
//                             <input
//                                 name="userName"
//                                 value={formValues.userName}
//                                 onChange={handleChange}
//                                 className="form-control"
//                             />
//                         </div>
//                         <div className="mb-2">
//                             <label className="form-label">Email</label>
//                             <input
//                                 id="email"
//                                 name="email"
//                                 value={formValues.email}
//                                 onChange={handleChange}
//                                 className="form-control"
//                             />
//                         </div>
//                         <div className="mb-2">
//                             <label className="form-label">Mobile No</label>
//                             <input
//                                 id="mobileNo"
//                                 name="mobileNo"
//                                 value={formValues.mobileNo}
//                                 onChange={handleChange}
//                                 className="form-control"
//                             />
//                         </div>
//                         <div className="mb-2">
//                             <label className="form-label">Password</label>
//                             <input
//                                 id="password"
//                                 type="password"
//                                 name="password"
//                                 value={formValues.password}
//                                 onChange={handleChange}
//                                 className="form-control"
//                             />
//                         </div>
//                         <div className="mb-2">
//                             <label className="form-label">Confirm Password</label>
//                             <input
//                                 id="confirmPassword"
//                                 type="password"
//                                 name="confirmPassword"
//                                 value={formValues.confirmPassword}
//                                 onChange={handleChange}
//                                 className="form-control"
//                             />
//                         </div>
//                         <button type="submit" className="btn btn-primary">
//                             Update
//                         </button>
//                     </form>
//                 </div>
//             ) : (
//                 <div className="w-100 d-flex justify-content-center mt-5 pt-5">
//                     <DataTable value={[user]} className="p-datatable-sm" paginator rows={10}>
//                         <Column field="userName" header="Name" />
//                         <Column field="email" header="Email" />
//                         <Column field="mobileNo" header="Mobile No" />
//                         <Column header="Action">
//                             <button className="btn btn-primary" onClick={handleEdit}>
//                                 Edit
//                             </button>
//                             <button className="btn btn-danger m-2" onClick={handleDelete}>
//                                 Delete
//                             </button>
//                         </Column>
//                     </DataTable>
//                 </div>
//             )}
//         </>
//     );
// };

// export default UserTable;


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUser, deleteUser } from "../Store/Auth/AuthAction";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./UserTable.css";


const UserTable = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    userRole: "",
    status: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const useremail = localStorage.getItem("email");
    if (token && useremail) {
      dispatch(fetchUser(useremail));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setFormData({
        userId: userData.userId || "",
        userName: userData.userName || "",
        email: userData.email || "",
        password: "",
        confirmPassword: "",
        mobileNo: userData.mobileNo || "",
        userRole: userData.userRole || "",
        status: userData.status || "",
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    dispatch(updateUser(formData));
    setIsEditing(false);
    window.location.reload();
  };

  const handleEdit = (useremail) => {
    setIsEditing(true);
    dispatch(fetchUser(useremail));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userData.email));
      navigate("/login");
      window.location.reload();
    }
  };

  const openNew = () => {
    navigate("/");
  };

  return (
    <div className="container table-style mt-5">
      <div className="">
        {userData ? (
          <div className="">
            {isEditing ? (
              <div className="form-container">
                <h2 className="ms-4 mt-2">User Update</h2>
                <form onSubmit={handleUpdate} className="p-4">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="User Name"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Mobile Number"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                  <div className="button-group mt-4">
                    <Button variant="contained" color="primary" type="submit">
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setIsEditing(false)}
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
                // <div className="table-responsive">
                <Box className="container mt-5" sx={{ border: "2px solid #ccc", padding: "20px" }}>
              <Card className="container">
               
                <CardContent>
                  <h2 className="">User Profile</h2>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>User Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Mobile Number</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{userData.userName}</TableCell>
                          <TableCell>{userData.email}</TableCell>
                          <TableCell>{userData.mobileNo}</TableCell>
                          <TableCell>{userData.status}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleEdit(userData.email)}
                           
                              style={{ marginRight: "10px" }}
                              sx={{ mt: 1,  }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={handleDelete}
                              sx={{ mt: 1, ms: 5 }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
                  </Card>
                  </Box>
              // </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserTable;
