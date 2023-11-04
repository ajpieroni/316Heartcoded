

import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import axios from 'axios';
import { UserContext } from "../components/contexts/UserContext";


function StatesList({ onStateSelected }) {
  const [states, setStates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/states')
      .then(response => {
        setStates(response.data);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }, []);

  return (
    <div>
      <label>
        Select Your Location<span style={{ color: 'red' }}>*</span>: 
        <select onChange={onStateSelected}>
          <option value="">Select a state</option>
          {states.map(state => (
            <option key={state.id} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default function UserForm({ onUserAdded }) {

    const { user, setUser } = useContext(UserContext);
    const currentUser = user?.location;
    console.log("currentUser",currentUser);

    const initialFormData = user
    ? {
        name: user.name || '',
        gender: user.gender || '',
        birthday: user.birthday || '',
        bio: user.bio || '',
        location: user.location || ''
      }
    : {
        name: '',
        gender: '',
        birthday: '',
        bio: '',
        location: ''
      };

  
  const [formData, setFormData] = useState(initialFormData);


  console.log("testing passing name",formData.name);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleStateSelected = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, location: selectedState }); // Update the field name to 'location'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/test_users", formData);
      onUserAdded(response.data); // Update the user list with the new user
      setFormData({ name: '', gender: '', preferences: '', birthday: '', bio: '', location: '' });
      //setSuccessMessage("Form submitted successfully.");
    } catch (error) {
      console.error('Error adding a new user:', error);
    }
  };

  return (
    <div className="user-form">
      <h2>Edit Current Profile NEEDS TO BE IMPLEMENTED</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name<span style={{ color: 'red' }}>*</span>: 
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Gender<span style={{ color: 'red' }}>*</span>:  
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
            <option value="Nonbinary">Nonbinary</option>
            <option value="other">Other</option>
          </select>
        </label>

        {formData.gender === 'other' && (
          <label>
            Please self describe your gender: 
            <input
              type="text"
              name="otherGender"
              value={formData.otherGender}
              onChange={handleInputChange}
              required
            />
          </label>
        )}
        <label>
          Birthday<span style={{ color: 'red' }}>*</span>: 
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
            required
          />
        </label>
        <StatesList onStateSelected={handleStateSelected} />
        <label>
          Who would you like to meet<span style={{ color: 'red' }}>*</span>: 
          <select
            name="preferences"
            value={formData.preferences}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
            <option value="Nonbinary">Nonbinary</option>
            <option value="Open">Open to any</option>
          </select>
        </label>
        <label>
          Bio: 
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
