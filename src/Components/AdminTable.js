import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { fetchUsersRequest, deleteUser } from "../Store/Auth/AuthAction";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { Add as AddIcon, Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./UserTable.css";

const AdminTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state);
  const [searchText, setSearchText] = React.useState("");

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want to delete this Admin?")) {
      dispatch(deleteUser(email));
      navigate("/login");
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  const filteredRows = users.filter((user) =>
    user.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  const openNew = () => {
    navigate("/");
  };

  const columns = [
    { field: "userName", headerName: "User Name", width: 180 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "mobileNo", headerName: "Mobile Number", width: 180 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row.email)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const rows = filteredRows.map((user) => ({
    id: user.userId,
    userName: user.userName,
    email: user.email,
    mobileNo: user.mobileNo,
    status: user.status,
  }));

  return (
    <Box className="container mt-5" sx={{ border: "2px solid #ccc", padding: "20px" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <Button variant="contained" color="primary" onClick={openNew} startIcon={<AddIcon />}>
          New
        </Button>
        <Typography variant="h4" sx={{ marginLeft: "20px" }}>
          User Profile
        </Typography>
        <Box sx={{ marginLeft: "auto", marginRight: "5px" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}  
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {searchText && (
                    <IconButton onClick={handleClearSearch} size="small">
                      <ClearIcon />
                    </IconButton>
                  )}
                  <IconButton size="small">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <div style={{ height: 400, width: "100%", border: "2px solid #ccc", borderRadius: "8px" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      </div>
    </Box>
  );
};

export default AdminTable;
