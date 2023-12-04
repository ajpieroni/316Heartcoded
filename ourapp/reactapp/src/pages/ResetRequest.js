import React, { useState } from 'react';

const ResetRequest = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/password/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Password Reset Request</h1>
      <form onSubmit={handleRequest}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Request Reset Code</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default ResetRequest;
