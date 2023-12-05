import React, { useState } from 'react';
import "./ResetPassword.css"

const ResetPassword = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');
  const [step, setStep] = useState(1); // Added new state to track the step

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      if (step === 1) {
        // If in the first step, confirm the code
        const response = await fetch('/password/confirm-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();
        if (response.ok) {
          setStatus(data.status);
          setStep(2); // Move to the next step
        } else {
          setStatus('Code confirmation failed. Please try again.');
        }
      } else if (step === 2) {
        // If in the second step, reset the password
        const response = await fetch('/password/reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, password: newPassword }),
        });

        const data = await response.json();
        setStatus(data.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleReset}>
        {step === 1 && (
          <div>
            <label>Reset Code:</label>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
          </div>
        )}
        {step === 2 && (
          <div>
            <label>New Password:</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
        )}
        <button type="submit">
          {step === 1 ? 'Confirm Code' : 'Reset Password'}
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default ResetPassword;
