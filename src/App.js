import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import { Provider } from 'react-redux';
import store from './Store/Auth/Store'; 
import UserLoginForm from './Components/Login/UserLoginForm';
import UserRegisterForm from './Components/SignUp/UserRegisterForm';
import AdminTable from './Components/AdminTable';
import UpdateUser from './Components/UpdateUser';
import UserTable from './Components/UserTable';
import Home from "./Components/Layout/Home";
import Layout from "./Components/Layout/Layouts";

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect from '/' to '/home' */}
            <Route path="/signup" element={<UserRegisterForm />} />
            <Route path="/login" element={<UserLoginForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/usertable" element={<UserTable />} />
            <Route path="/admintable" element={<AdminTable />} />
            <Route path="/edit/:userId" element={<UpdateUser />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
