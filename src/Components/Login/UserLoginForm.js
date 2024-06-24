// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// const UserLoginForm = () => {
//   const [fullName, setFullname] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/auth/user/login",
//         {
//           userName: fullName,
//           password: password,
//         }
//       );

//       console.log(response.data); 

//       const responseBody = response.data.data.body; 

//       if (responseBody && responseBody.jwt) {
//         localStorage.setItem("token", responseBody.jwt); // Store the token
//         localStorage.setItem("username", responseBody.userName); // Store the username

//         if (responseBody.role === "USER") {
//           navigate("/usertable");
//         } else if (responseBody.role === "ADMIN") {
//           navigate("/admintable");
//         } else {
//           setMessage("Unexpected user role");
//           console.error("Unexpected user role", responseBody.role);
//         }
//       } else {
//         setMessage("User is not Found");
//         console.error("Unexpected response structure", response.data);
//       }
//     } catch (error) {
//       setMessage("Error logging in");
//       console.error("There was an error!", error);
//     }
//   };

//   return (
//     <div id="login-form" className="container">
//       <div className="card carding p-5">
//         <h2 className="text-center">Login</h2>
//         <form onSubmit={handleLoginSubmit} className="">
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"  
//               placeholder="Enter email or username"
//               value={fullName}
//               onChange={(e) => setFullname(e.target.value)}
//             />
//           </div>
//           <div className="mb-3 password-field">
//             <input
//               type={passwordVisible ? "text" : "password"}
//               className="form-control"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit" className="btn btn-primarys w-100">
//             Login
//           </button>
//           <p className="text-center mt-3">
//             <a href="javascript:void(0)" className="text-decoration-none">
//               Forgotten account
//             </a>
//             <a href="/" className="text-decoration-none ms-4">
//               Signup
//             </a>
//           </p>
//           <hr />
//           {message && <p className="text-danger">{message}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserLoginForm;

// src/Components/Login/UserLoginForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Store/Auth/AuthSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const UserLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.auth.message);
  const error = useSelector((state) => state.auth.error);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    let errors = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    dispatch(loginUser({ username, password }));
  };

  // Redirect user to Usertable  on successful login
  React.useEffect(() => {
    if (message === 'Login successful!') {
      navigate('/usertable');
    }
  }, [message, navigate]);

  return (
    <div id="login-form" className="container mt-5">
      <h2 className="text-center mb-3">Login Form</h2>
      <form onSubmit={handleLoginSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="text-danger">{errors.username}</p>}
        </div>
        <div className="input-group mb-3">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control password-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>
        <button type="submit" className="btn btn-primarys fw-bold">
          Login
        </button>
        <p className="text-center mt-3">
          Don't have an account? <a href="/" className="text-decoration">Sign Up</a>
        </p>
        <hr />
      </form>
      {message && <p className="text-center mt-3">{message}</p>}
      {error && <p className="text-center mt-3 text-danger">{error}</p>}
    </div>
  );
};

export default UserLoginForm;

