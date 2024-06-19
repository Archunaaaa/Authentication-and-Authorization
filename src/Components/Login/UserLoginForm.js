import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const UserLoginForm = () => {
  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/user/login",
        {
          userName: fullName,
          password: password,
        }
      );

      console.log(response.data); 

      const responseBody = response.data.data.body; 

      if (responseBody && responseBody.jwt) {
        localStorage.setItem("token", responseBody.jwt); // Store the token
        localStorage.setItem("username", responseBody.userName); // Store the username

        if (responseBody.role === "USER") {
          navigate("/usertable");
        } else if (responseBody.role === "ADMIN") {
          navigate("/admintable");
        } else {
          setMessage("Unexpected user role");
          console.error("Unexpected user role", responseBody.role);
        }
      } else {
        setMessage("User is not Found");
        console.error("Unexpected response structure", response.data);
      }
    } catch (error) {
      setMessage("Error logging in");
      console.error("There was an error!", error);
    }
  };

  return (
    <div id="login-form" className="container">
      <div className="card carding p-5">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleLoginSubmit} className="">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"  
              placeholder="Enter email or username"
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="mb-3 password-field">
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primarys w-100">
            Login
          </button>
          <p className="text-center mt-3">
            <a href="javascript:void(0)" className="text-decoration-none">
              Forgotten account
            </a>
            <a href="/" className="text-decoration-none ms-4">
              Signup
            </a>
          </p>
          <hr />
          {message && <p className="text-danger">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserLoginForm;
