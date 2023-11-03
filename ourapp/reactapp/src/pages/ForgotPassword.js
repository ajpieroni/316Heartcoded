import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import { useEffect } from "react";
import axios from "axios";
import "./ForgotPassword.css"


function ForgotPassword() {
  const [username, setUsername] = useState('');
  const { user, setUser } = useContext(UserContext);
  const[password, setPassword] = useState();
  
  useEffect(() => {
    console.log("user:", user);
    console.log("userid", user?.id)
      }, [user]);

  const requestPasswordReset = () => {
    console.log("Requesting password reset for:", username);
    
    axios.get(`http://localhost:3000/passwords/${user.id}`)
    .then((response) => {
        console.log("response", response)
        setPassword(response.data.hashed_password);
    })
    .catch((error) => {
        console.error("No matching username", error);
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
    <button className="reset-button" onClick={requestPasswordReset}>Password Reset</button>
    <p className="password-display">{password}</p>
</div>
  );
  

}

export default ForgotPassword;
