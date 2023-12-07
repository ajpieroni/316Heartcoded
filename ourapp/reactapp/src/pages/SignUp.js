import React, { useState, useEffect, useContext } from "react";
import "./UserLanding.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import PasswordRequirements from './PasswordRequirements.js';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";



export default function UserLanding() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      if (localStorage.getItem('username') !== username) {
        localStorage.setItem('username', username);
        console.log("username changed")
        // console.log(changedU + )
      }
        setError('Username is already taken.');
        return;
        
      }
    
    axios.post("http://localhost:3000/test_users", {
      test_user: {
        username: username,
        password: password,
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log(response.data);
      if (response.data.success === true) {
        const message = "Account successfully created. Click here to <a href='/CreateProfile'>initialize profile</a>";
        setSuccessMessage(message);
       
        navigate("/CreateProfile");
      }
      else{
        setError("Password must be at least 6 characters long and include at least one letter and one number");
      }      
    })
    .catch(error => {
      console.error(error.response.data);
      setError("Registration failed. Please try again.");
    });
    
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
          

          <div className="setpassword-input-container">
          <input
            type={showPassword ? "text" : "password"}
            className="setpass-init-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Set Password"
            required
          />
          <IconButton
            className="show-password-button"
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </div>

        <div className="setpassword-input-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="setpass-init-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <IconButton
            className="show-password-button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            edge="end"
          >
            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </div>

  
          <PasswordRequirements password={password} />
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
