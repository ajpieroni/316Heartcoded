import React, { useState } from "react";

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const requestPasswordReset = () => {
    console.log("Requesting password reset for:", username);
    
    fetch(`http://localhost:3000/test_users/request_password_reset/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setMessage(data.message || "Password reset instructions sent. Please check your email.");
        } else {
          setMessage(data.error || "User not found.");
        }
      })
      .catch((error) => {
        console.error("Failed to request password reset:", error);
        setMessage("An error occurred. Please try again.");
      });
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <p>Enter your username to request password reset instructions.</p>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button onClick={requestPasswordReset}>Request Password Reset</button>
      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;
