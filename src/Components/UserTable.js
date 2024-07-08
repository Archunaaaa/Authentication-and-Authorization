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
    navigate("/signup");
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
                  <div className="button-group text-center mt-4">
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
                <Box className="container" sx={{ border: "2px solid #ccc", padding: "20px" }}>
              
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
                  </Box>
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