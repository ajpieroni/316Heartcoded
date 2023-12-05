import React, { useState } from 'react';
import "./ResetRequest.css";

const ResetRequest = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const [passwordResetResponse, setPasswordResetResponse] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);



//   const initializeUser = async (e) => {
//     e.preventDefault();

//     console.log("Fetching user data");  
//     try {
//       const url = `http://localhost:3000/test_users/find_by_email?email=${email}`;
//       const response = await fetch(url);
  
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       console.log(data);
//       console.log(data.id);
//       return data.id;
//     } catch (error) {
//       console.error("Failed to fetch user:", error);
//       return null;
//     }
//   };

  const handleRequest = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
      const response = await fetch('http://localhost:3000/password/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setStatus(data.status);
        setError('');
        setUser(data.user);
        setStep(2); // Move to the next step
      } else {
        setStatus('');
        setError(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('');
      setError('An unexpected error occurred.');
    }
    finally {
        setLoading(false);
      }
  };

  const handleConfirmCode = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/password/confirm-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reset_password_token: code }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        const { user_id } = responseData;
        console.log('User ID:', user_id);
        setUserId(user_id);
        setError('');
        setStep(3);
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
        setStatus('');
        setError(errorData.error); 
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('');
      setError('An unexpected error occurred.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    console.log(userId);

    try {
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

//   const handleChangePassword = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3000/password/reset', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ reset_password_token: code, password: newPassword }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStatus(data.status);
//         setError('');
//       } else {
//         setStatus('');
//         setError(data.error);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setStatus('');
//       setError('An unexpected error occurred.');
//     }
//   };

  return (
    <div className="forgot-password-container">
      <h1 className="forgot-password-title">Forgot Password</h1>
      {step === 1 && (
        <>
          <p className="forgot-password-instruction">Enter your email to reset password.</p>
          <form onSubmit={handleRequest}>
            <div className="button-pass-container">
              <input
                className="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <button className="reset-button" type="submit">Request Password Reset</button>
            </div>
            {loading && (
                <div className="loading-page">
                <p>Loading...</p>
                </div>
            )}
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <p className="forgot-password-instruction">Check your email for a code and enter it below.</p>
          <form onSubmit={handleConfirmCode}>
            <div className="button-pass-container">
              <input
                className="code-input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code"
              />
              <button className="reset-button" type="submit">Confirm Code</button>
            </div>
          </form>
        </>
      )}
      {step === 3 && (
        <>
          <p className="forgot-password-instruction">Enter your new password.</p>
          <form onSubmit={handleChangePassword}>
            <div className="button-pass-container">
              <input
                className="new-password-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
              />
              <button className="reset-button" type="submit">Reset Password</button>
              <p className="password-reset-response">{passwordResetResponse}</p>
            </div>
          </form>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};


export default ResetRequest;
