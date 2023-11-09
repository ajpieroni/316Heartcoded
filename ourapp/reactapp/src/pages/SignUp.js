import React, { useState, useEffect, useContext } from "react";
import "./UserLanding.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
//import bcrypt from 'bcryptjs';

export default function UserLanding() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate();

  const signUpUser = async () => {
    setError(null);
    setSuccessMessage('');

    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields before signing up.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) {
      setError('Username is already taken.');
      return;
    }

    try {
      localStorage.setItem('username', username);
      navigate("/CreateProfile");
    } catch (error) {
      setError('There was an error signing up.');
      console.error('Sign up error: ', error);
    }
  };

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    }
  }, [username]); 
  
  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch(`http://localhost:3000/test_users/check_username?username=${encodeURIComponent(username)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.message.includes('is available')) {
        return true;
      }
    } catch (error) {
      console.error('There was an error checking the username: ', error);
    }
    return false;
  };
  // check_username?username=AlexZZ

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
            required
          />
          <input
            type="password"
            className="user-init-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Set Password"
            required
          />
          <input
            type="password"
            className="user-init-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button className="user-init-button" onClick={signUpUser}>
            Sign Up
          </button>
        </div>
        {successMessage && (
        <p dangerouslySetInnerHTML={{ __html: successMessage }}></p>
      )}

      </div>
    </main>
  );
}
