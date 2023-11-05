import React, { useState, useEffect, useContext } from "react";
import "./UserLanding.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/contexts/UserContext";
//import bcrypt from 'bcryptjs';

export default function UserLanding() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');


  const signUpUser = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    //const hashedPassword = bcrypt.hash(password, 10);
    axios.post("http://localhost:3000/test_users", {
      test_user: {
        name: username,
        password: password,
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log(response.data);
      setSuccessMessage("Account successfully created. Please log in and initialize your profile");
    })
    .catch(error => {
      console.error(error.response.data);
      setError("Registration failed. Please try again.");
    });
  };

  useEffect(() => {
    // Your existing useEffect code
    // ...
  }, []);

  return (
    <main className="main-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to HeartCoded</h1>
        <p className="hero-subtitle">Sign up to find your soulmate today!</p>
        
        <div className="user-init-container">
          <input
            className="user-init-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
          <input
            type="password"
            className="user-init-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Set Password"
          />
          <input
            type="password"
            className="user-init-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          {error && <p className="error-message">{error}</p>}
          <button className="user-init-button" onClick={signUpUser}>
            Sign Up
          </button>
        </div>
          {successMessage && <p>{successMessage}</p>}
      </div>
    </main>
  );
}
