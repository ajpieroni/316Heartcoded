import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../components/contexts/UserContext";
import "./ViewProfile.css";
import { Link } from "react-router-dom";


export default function UserForm({ onUserAdded }) {
  const [ageError, setAgeError] = useState("");
  const [days, setDays] = useState(null);
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
    console.log('User ID in useEffect:', user.id);

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

        const joinedDate = new Date(userData.created_at);
        const today = new Date();
        const timeDiff = today - joinedDate;
        const calculatedDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        setDays(calculatedDays);

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
          Your Location: 
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

  console.log(user.id);


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


  return (
    <div className="user-profile">
      <form>
        {/* <h1>Hello, {formData.name}! You've been with us since {formData.createdAt.split('T')[0]}</h1> */}
        <h1 className="view-profile-title">Hello, {formData.name}! You've been with us for {days} {days === 1 ? 'day' : 'days'}.</h1>
        <div className="profile-form">
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to={{
        pathname: '/EditProfile',
        state: { data: user }
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
          stroke="white"
          style={{ width: '30px', height: '30px' }}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
</Link>
<p>Last updated at: {formData.updatedAt}</p>
</div>
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
          Name: 
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
          Gender:  
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
          Birthday:
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
          Who would you like to meet: 
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
        </div>
        {/* <button
          className="profile-button"
          type="button"
          onClick={() => setPasswordUpdateVisible(!isPasswordUpdateVisible)}
          disabled
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
        )} */}
        <br></br>
        <p>Want to delete your profile?</p>

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