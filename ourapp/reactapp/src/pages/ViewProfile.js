import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../components/contexts/UserContext";
import "./CreateProfile.css";

export default function UserForm({ onUserAdded }) {
  const [ageError, setAgeError] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthday: '',
    bio: '',
    location: '',
    preferences: '',
    password: '',
    red_flags: [],
    createdAt: '',
    updatedAt: '',
    username: ''
  });

  const { user } = useContext(UserContext);
  
  useEffect(() => {
    axios.get(`http://localhost:3000/test_users/${user.id}`)
      .then(response => {
        let userData = response.data;
        setFormData({
          name: userData.name || '',
          gender: userData.gender || '',
          birthday: userData.birthday || '',
          bio: userData.bio || '',
          location: userData.location || '',
          preferences: userData.preferences || '',
          password: userData.password || '',
          red_flags: userData.red_flags || [],
          createdAt: userData.created_at || '',
          updatedAt: userData.updated_at || '',
          username: userData.username || ''
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [user.id]);

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
          <select onChange={onStateSelected} required value={formData.location} disabled className="disabled-field">
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "birthday") {
      validateAge(value);
    }
  };

  const handleStateSelected = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, location: selectedState });
  };

  const validateAge = (birthdate) => {
    const today = new Date();
    const enteredDate = new Date(birthdate);

    if (today < new Date(enteredDate.getFullYear() + 18, enteredDate.getMonth(), enteredDate.getDate())) {
      setAgeError("You can't become younger by changing your birthday");
    } else {
      setAgeError("");
    }
  };

  const [isPasswordUpdateVisible, setPasswordUpdateVisible] = useState(false);
  const [selectedRedFlags, setSelectedRedFlags] = useState(formData.red_flags || []);

  useEffect(() => {
    setSelectedRedFlags(formData.red_flags || []);
  }, [formData.red_flags]);

  const redFlagsOptions = [
    "Vanity",
    "Environmental Consciousness",
    "Spirituality",
    "Family",
    "Career",
    "Adventure",
    "Trustfulness",
    "Frugality",
    "Sentimentality",
    "Creativity",
    "Traditionalism",
    "Assertiveness"
  ];

  const handleRedFlagsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedRedFlags(selectedOptions);
    setFormData({ ...formData, red_flags: selectedOptions });
  };

  return (
    <div className="user-form">
      <form>
        <h1>Hello, {formData.name}! You've been with us since {formData.createdAt.split('T')[0]}</h1>
        <p>Last updated at: {formData.updatedAt}</p>
        <label>
          Username: 
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            disabled
            className="disabled-field"
          />
        </label>
        <label>
          Name<span style={{ color: 'red' }}>*</span>: 
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled
            className="disabled-field"
          />
        </label>
        <label>
          Gender<span style={{ color: 'red' }}>*</span>:  
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            disabled
            className="disabled-field"
          >
            <option value="">Select Gender</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
            <option value="Nonbinary">Nonbinary</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Birthday<span style={{ color: "red" }}>*</span>:
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
            required
            disabled
            className="disabled-field"
          />
          {ageError && <div style={{ color: "red" }}>{ageError}</div>}
        </label>
        <StatesList onStateSelected={handleStateSelected} />
        <label>
          Who would you like to meet<span style={{ color: 'red' }}>*</span>: 
          <select
            name="preferences"
            value={formData.preferences}
            onChange={handleInputChange}
            required
            disabled
            className="disabled-field"
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
            disabled
            className="disabled-field"
          />
        </label>
        <label>
          Your red flags:
          {/* <select
            multiple
            name="red_flags"
            value={formData.red_flags}
            onChange={handleRedFlagsChange}
            disabled
            className="disabled-field"
          >
            {redFlagsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select> */}
        </label>
        <div>
          <div>
            {selectedRedFlags.map((flag) => (
              <div key={flag} className="selected-flag">
                {flag}
              </div>
            ))}
          </div>
        </div>
        <button
          className="profile-button"
          type="button"
          onClick={() => setPasswordUpdateVisible(!isPasswordUpdateVisible)}
          disabled
          className="disabled-field"
        >
          Update password?
        </button>
        {isPasswordUpdateVisible && (
          <label>
            Update Password: 
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled
              className="disabled-field"
            />
          </label>
        )}
        <br></br>
      </form>
    </div>
  );
}

  


// import React, { useState, useEffect, useContext } from "react";
// import "./UserLogin.css";
// import { useNavigate } from "react-router-dom";

// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { UserContext } from "../components/contexts/UserContext";


// export default function ViewProfile() {
//     const { user } = useContext(UserContext);

//     useEffect(() => {
//       axios.get(`http://localhost:3000/test_users/${user.id}`)
//         .then(response => {
//           const userData = response.data;
  
//           // Handle user data as needed, you can log it or perform other actions
//           console.log(userData);
//         })
//         .catch(error => {
//           console.error('Error fetching user data:', error);
//         });
//     }, [user.id]);
      
//   return (
//     <main className="main-container">
//         <h2>{user.name}'s Profile</h2>
//         <h2>Username: {user.username}</h2>
//         <h2>You've been with us since: {user.join_date}</h2>
//         <h2>Gender: {user.gender}</h2>
//         <h2>birthday: {user.birthday}</h2>
//         <h2>bio: {user.bio}</h2>
//         <h2>Email: {user.email}</h2>
//         <h2>Location: {user.locaiton}</h2>
//         <h2>You are looking for: {user.preferences}</h2>
//         <h2>Your Red Flags: {user.red_flags}</h2>


//     </main>

//   );
  
// }
