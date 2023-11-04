import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../components/contexts/UserContext";
import ForgotPassword from "./ForgotPassword";
import CreateProfile from "./CreateProfile.js";
import "./UserLogin.css";

export default function UserLogin() {
  // State hooks
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true); // Show sign-in by default
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  // Context
  const { user, setUser } = useContext(UserContext);

  // Navigation hook
  const navigate = useNavigate();

  // Handlers
  const toggleForgotPassword = () => setShowForgotPassword(prev => !prev);
  const toggleSignIn = () => {
    setShowSignIn(!showSignIn);
    setShowSignUp(false);
  };
  const toggleSignUp = () => {
    const willShowSignUp = !showSignUp;
    setShowSignUp(willShowSignUp);
    if (willShowSignUp) {
      navigate('/CreateProfile'); 
    } else {
      setShowSignIn(true); 
    }
  };
  const handleSignUp = () => {
    // TODO: SignUp logic
  };

  const initializeUser = () => {
    // User initialization logic
    fetch(`http://localhost:3000/test_users/find_by_username/${username}`)
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(data => {
        if (data) {
          setUser(prevUser => ({ ...prevUser, ...data }));
          sessionStorage.setItem("user", JSON.stringify(data));
          navigate('/UserSignedIn');
          setLogin(true);
        } else {
          // Handle non-existing user logic
        }
      })
      .catch(error => console.error("Failed to initialize user:", error));
  };

  // Effects
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLogin(true);
    }
  }, [setUser]);

  // Render helpers
  const renderSignUpButton = () => (
    showSignIn && !showForgotPassword && (
      <button className="sign-up-button" onClick={toggleSignUp}>
        Sign Up
      </button>
    )
  );

  // Component render
  return (
    <main className="main-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to HeartCoded</h1>
        <p className="hero-subtitle">Find your soulmate today!</p>
        <div className="user-init-container">
          {showSignIn && (
            <div>
              <input
                className="user-init-input"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter Username"
              />
              <input
                type="password"
                className="user-init-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
              <button className="user-init-button" onClick={initializeUser}>
                Sign In
              </button>
            </div>
          )}
          {showSignIn && (
            <>
              <button className="forgot-password-toggle" onClick={toggleForgotPassword}>
                Forgot Password?
              </button>
              {showForgotPassword && <ForgotPassword />}
            </>
          )}
          {renderSignUpButton()}
          {showSignUp && (
            <>
              <CreateProfile />
              <button onClick={toggleSignIn}>Already have an account? Sign In</button>
            </>
          )}
          {showForgotPassword && <ForgotPassword />}
        </div>
      </div>
    </main>
  );
}
