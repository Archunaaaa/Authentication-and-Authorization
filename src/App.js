import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/Auth/Store'; 
import UserLoginForm from './Components/Login/UserLoginForm';
import UserRegisterForm from './Components/SignUp/UserRegisterForm';
import AdminTable from './Components/AdminTable';
import UpdateUser from './Components/UpdateUser';
import UserTable from './Components/UserTable';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<UserRegisterForm />} />
            <Route path="/login" element={<UserLoginForm />} />
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
