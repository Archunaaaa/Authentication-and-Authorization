import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const handleRegisterClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    navigate("/signup");
  };

  return (
    <div>
      <div
        className="overlay"
        style={{ display: isModalOpen ? "block" : "none" }}
      ></div>
      <div>
        <p className="logo  mt-5">THCHNOLOGY</p>
      </div>
      <div className="right-container">
        <h2>ABC Technology </h2>
        <p>Welcome! Follow these easy steps to create your account: .</p>
        <button className="modal-button" onClick={handleRegisterClick}>
          REGISTER
        </button>
      </div>
    </div>
  );
};

export default Home;