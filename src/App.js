import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLoginForm from "./Components/Login/UserLoginForm";
import UserRegisterForm from "./Components/SignUp/UserRegisterForm";
import AdminTable from "./Components/AdminTable";
import UpdateUser from "./Components/UpdateUser";
import UserTable from "./Components/UserTable";


const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>        
          <Route path="/" element={<UserRegisterForm />} />
          <Route path="/login" element={<UserLoginForm />} />
          <Route path="/usertable" element={<UserTable />} />
          <Route path="/admintable" element={<AdminTable />} />
          <Route path="edit/:UpdateUser" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
