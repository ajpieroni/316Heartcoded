import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import { useEffect } from "react";
import axios from "axios";
import "./ForgotPassword.css"


function ForgotPassword() {
  const [username, setUsername] = useState('');
  const { user, setUser } = useContext(UserContext);
  const[newPassword, setNewPassword] = useState();
  const [passwordResetResponse, setPasswordResetResponse] = useState('');
  
  useEffect(() => {
    console.log("user:", user);
    console.log("userid", user?.id)
      }, [user]);


  const requestPasswordReset = () => {
    console.log("Requesting password reset for:", username);

    axios.patch(`http://localhost:3000/test_users/${user.id}`, {
        password: newPassword,
      })
      .then((response) => {
        console.log("Password reset successful", response);
        setPasswordResetResponse('Password reset successful');
      })
      .catch((error) => {
        console.error("Failed to reset password", error);
        setPasswordResetResponse('Failed to reset password');
      });
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
};
  



export default ForgotPassword;
