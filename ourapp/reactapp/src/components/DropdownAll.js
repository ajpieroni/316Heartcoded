import React, { useState } from 'react';

const DropdownAll = ({ options, value, onChange, renderDropdown }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownChange = (event) => {
    value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleDropdownChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownAll;