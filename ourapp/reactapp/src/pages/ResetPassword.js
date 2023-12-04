import React, { useState } from 'react';

const ResetPassword = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, password: newPassword }),
      });

      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleReset}>
        <label>Reset Code:</label>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default ResetPassword;
