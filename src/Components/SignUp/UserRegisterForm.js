// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Register.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// const UserRegisterForm = () => {
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [mobileNo, setMobileNo] = useState("");
//   const [userRole, setRole] = useState("");
//   const [message, setMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/auth/admin/check");
//       setUsers(response.data.users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const validateInputs = () => {
//     let errors = {};

//     if (!userName.trim()) {
//       errors.userName = "Username is required";
//     }
//     if (!email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = "Email address is invalid";
//     }
//     if (!password.trim()) {
//       errors.password = "Password is required";
//     } else if (password.length < 6) {
//       errors.password = "Password must be at least 6 characters";
//     }
//     if (!confirmPassword.trim()) {
//       errors.confirmPassword = "Confirm password is required";
//     } else if (password !== confirmPassword) {
//       errors.confirmPassword = "Passwords do not match";
//     }
//     if (!mobileNo.trim()) {
//       errors.mobileNo = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(mobileNo)) {
//       errors.mobileNo = "Mobile number must be 10 digits";
//     }
//     if (!userRole) {
//       errors.userRole = "Role is required";
//     }

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateInputs()) {
//       return;
//     }
//     try {
//       const userData = {
//         userName,
//         email,
//         password,
//         confirmPassword,
//         mobileNo,
//         userRole,
//       };

//       const response = await axios.post("http://localhost:8080/api/auth/user/register", userData);
//       setMessage("User registered successfully!");
//       localStorage.setItem("token", response.data.token);
//       navigate("/login"); // Redirect to login page only on successful registration
//     } catch (error) {
//       if (error.response) {
//         setMessage(`Error: ${error.response.data.message}`);
//         console.error("Server responded with error:", error.response.data);
//       } else if (error.request) {
//         setMessage("Error: No response received from server.");
//         console.error("No response received from server:", error.request);
//       } else {
//         setMessage("Error: Something went wrong while sending the request.");
//         console.error("Error during request setup:", error.message);
//       }
//     }
//   };

//   return (
//     <div id="signup-form" className="container mt-5">
//       <h2 className="text-center mb-3">SignUp Form</h2>
//       <form onSubmit={handleSignupSubmit}>
//         <div className="mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Username"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           {errors.userName && <p className="text-danger">{errors.userName}</p>}
//         </div>
//         <div className="mb-3">
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {errors.email && <p className="text-danger">{errors.email}</p>}
//         </div>
//         <div className="mb-3">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Mobile Number"
//             value={mobileNo}
//             onChange={(e) => setMobileNo(e.target.value)}
//           />
//           {errors.mobileNo && <p className="text-danger">{errors.mobileNo}</p>}
//         </div>
//         <div className="input-group mb-3">
//           <input
//             type={showPassword ? "text" : "password"}
//             className="form-control password-input"
//             placeholder="Create password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <span className="toggle-password" onClick={togglePasswordVisibility}>
//             <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
//           </span>
//           {errors.password && <p className="text-danger">{errors.password}</p>}
//         </div>
//         <div className="input-group mb-3">
//           <input
//             type={showPassword ? "text" : "password"}
//             className="form-control password-input"
//             placeholder="Confirm password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <span className="toggle-password" onClick={togglePasswordVisibility}>
//             <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
//           </span>
//           {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
//         </div>
//         <div className="mb-3">
//           <select
//             value={userRole}
//             className="form-control"
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="">Select Role</option>
//             <option value="admin">Admin</option>
//             <option value="user">User</option>
//           </select>
//           {errors.userRole && <p className="text-danger">{errors.userRole}</p>}
//         </div>
//         <button type="submit" className="btn btn-primary fw-bold">Create Account</button>
//         <p className="text-center mt-3">
//           Clicking <strong>Create Account</strong> means that you agree to
//           our <a href="#" className="text-decoration">terms of service</a>.
//           <a className="m-5 text-decoration" href="/login">Existing User? Login</a>
//         </p>
//         <hr />
//       </form>
//       {message && <p className="text-center mt-3">{message}</p>}
//     </div>
//   );
// };

// export default UserRegisterForm;



import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../../Store/Auth/AuthSlice';  // Adjust the path as necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";

const UserRegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.auth.message);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    let errors = {};

    if (!userName.trim()) {
      errors.userName = "Username is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!mobileNo.trim()) {
      errors.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobileNo)) {
      errors.mobileNo = "Mobile number must be 10 digits";
    }
    if (!userRole) {
      errors.userRole = "Role is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    dispatch(registerRequest({
      userName,
      email,
      password,
      confirmPassword,
      mobileNo,
      userRole,
      navigate
    }));
  };

  return (
    <div id="signup-form" className="container mt-5">
      <h2 className="text-center mb-3">SignUp Form</h2>
      <form onSubmit={handleSignupSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.userName && <p className="text-danger">{errors.userName}</p>}
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Mobile Number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
          {errors.mobileNo && <p className="text-danger">{errors.mobileNo}</p>}
        </div>
        <div className="input-group mb-3">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control password-input"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>
        <div className="input-group mb-3">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control password-input"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
          {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
        </div>
        <div className="mb-3">
          <select
            value={userRole}
            className="form-control"
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.userRole && <p className="text-danger">{errors.userRole}</p>}
        </div>
        <button type="submit" className="btn btn-primary fw-bold">Create Account</button>
        <p className="text-center mt-3">
          Clicking <strong>Create Account</strong> means that you agree to
          our <a href="#" className="text-decoration">terms of service</a>.
          <a className="m-5 text-decoration" href="/login">Existing User? Login</a>
        </p>
        <hr />
      </form>
      {message && <p className="text-center mt-3">{message}</p>}
    </div>
  );
};

export default UserRegisterForm;
