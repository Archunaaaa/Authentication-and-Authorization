import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import UserTable from "../UserTable";

const UserRegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (!mobileNo.trim()) {
      errors.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobileNo)) {
      errors.mobileNo = "Mobile number must be 10 digits";
    }
    if (!role) {
      errors.role = "Role is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    try {
      const response = await axios.post("your-api-endpoint", {
        userName,
        email,
        password,
        mobileNo,
        role,
      });
      setMessage(response.data.message);
      setUserName("");
      setEmail("");
      setPassword("");
      setMobileNo("");
      setRole("");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
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
            <div className="mb-3">
              <select
                value={role}
                className="form-control"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {errors.role && <p className="text-danger">{errors.role}</p>}
            </div>
            <button type="submit" className="btn btn-primary fw-bold">Create Account</button>
            <p className="text-center mt-3">
              Clicking <strong>Create Account</strong> means that you agree to
              our <a href="javascript:void(0)">terms of service</a>.
              <a href="/login" className="ms-4">Login</a>
            </p>
            <hr />
          </form> 
        </div>
    </>
  );
};

export default UserRegisterForm;
