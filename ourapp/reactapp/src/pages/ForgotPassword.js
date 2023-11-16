import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordResetResponse, setPasswordResetResponse] = useState('');
  const [userId, setUserId] = useState('');

  const initializeUser = async () => {
    console.log("Fetching user data");  
    try {
      const encodedUsername = encodeURIComponent(username);
      console.log(encodedUsername);
      const url = `http://localhost:3000/test_users/find_by_username?username=${encodedUsername}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log(data);
      console.log(data.id);
      return data.id;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return null;
    }
  };
  

  const requestPasswordReset = async () => {
    try {
      const userId = await initializeUser();
      if (userId) {
        console.log("Requesting password reset for user ID:", userId);

        const response = await fetch(`http://localhost:3000/test_users/${userId}/update_password`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            password: newPassword 
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Password reset successful:", data);
        setPasswordResetResponse('Password reset successful');
      } else {
        console.log("UserID not found. Password reset cannot be processed.");
      }
    } catch (error) {
      console.error("Failed to reset password:", error);
      setPasswordResetResponse('Failed to reset password');
    }
  };

  return (
    <div className="forgot-password-container">
      <h1 className="forgot-password-title">Forgot Password</h1>
      <p className="forgot-password-instruction">Enter your username to reset password.</p>
      <input
        className="username-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        className="new-password-input"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
      />
      <button className="reset-button" onClick={requestPasswordReset}>Password Reset</button>
      <p className="password-reset-response">{passwordResetResponse}</p>
    </div>
  );
}

export default ForgotPassword;
