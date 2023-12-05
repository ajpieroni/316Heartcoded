import React, { useState, useEffect } from 'react';

const PasswordRequirements = ({ password }) => {
  const [passwordRequirements, setPasswordRequirements] = useState([
    { id: 1, text: 'Minimum 6 characters', isValid: false },
    // { id: 2, text: 'At least one uppercase letter', isValid: false },
    // { id: 3, text: 'At least one lowercase letter', isValid: false },
    { id: 4, text: 'At least one number', isValid: false },
  ]);

  useEffect(() => {
    const updatedRequirements = passwordRequirements.map((requirement) => ({
      ...requirement,
      isValid: checkRequirement(requirement.id),
    }));
    setPasswordRequirements(updatedRequirements);
  }, [password]);

  const checkRequirement = (requirementId) => {
    switch (requirementId) {
      case 1:
        return password.length >= 6;
      /*case 2:
        return /[A-Z]/.test(password);
      case 3:
        return /[a-z]/.test(password);
      */
      case 4:
        return /\d/.test(password);
      default:
        return false;
    }
  };

  return (
    <div>
        <ul>
        {passwordRequirements.map((requirement) => (
          <li key={requirement.id} style={{ color: requirement.isValid ? 'green' : 'white' }}>
            {requirement.text}
            {requirement.isValid && ' ✓'}
          </li>
        ))}
        </ul>
    </div>
  );
};

export default PasswordRequirements;
