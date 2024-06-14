import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const UserLoginForm = () => {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
     
    }
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/user/login",
        {
          fullname: fullname,
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
        setMessage("Unexpected response structure");
        console.error("Unexpected response structure", response.data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setMessage("Invalid username or password. Please try again.");
        } else if (error.response.status === 400) {
          setMessage("Invalid request. Please check your input.");
        } else {
          setMessage("Network error. Please check your connection.");
        }
      } else {
        setMessage("Error logging in");
        console.error("There was an error!", error);
      }
    }

    setFullname("");
    setPassword("");
  };

  return (
    <div id="login-form" className="container">
      <div className="card p-5">
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <p className="text-center mt-3">
            <a href="javascript:void(0)" className="text-decoration-none">
              Forgotten account
            </a>
            <a href="/" className="ms-4">
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
