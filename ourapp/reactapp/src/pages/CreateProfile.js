// import React, { useState, useEffect } from "react";
// import "./UserLanding.css";
// import axios from "axios";

// export default function CreateProfile() {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(""); 

//   const fetchData = () => {
//     fetch(`http://localhost:3000/test_users`)
//       .then((response) => response.json())
//       .then((data) => setUsers(data))
//       .catch((error) => {
//         console.error("Error fetching the question:", error);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const sortByName = () => {
//     const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
//     setUsers(sortedUsers);
//   };

//   const sortByBirthday = () => {
//     const sortedUsers = [...users].sort((a, b) => {
//       const dateA = new Date(a.birthday);
//       const dateB = new Date(b.birthday);
//       return dateA - dateB;
//     });
//     setUsers(sortedUsers);
//   };

//   // filter users based on the search term
//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

// // export default function UserForm({ onUserAdded }) {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     birthday: "",
// //     bio: "",
// //   });

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.post("http://localhost:3000/test_users", formData);
// //       onUserAdded(response.data); // Update the user list with the new user
// //       setFormData({ name: "", birthday: "", bio: "" }); // Clear the form
// //     } catch (error) {
// //       console.error("Error adding a new user:", error);
// //     }
// //   };

//   return (
//     <main className="main-container">
  
//       <h1>List of Users from Admin View</h1>
//       {/* <Link to="/AddProfile">
//           <div>
//             <h2>Add Profile</h2>
//             <p>Tell us about who you are so we can help you find good matches!</p>
//           </div>
//         </Link> */}
//       <input
//         type="text"
//         placeholder="Search by name"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <div className="button-container">
//         <button onClick={sortByName}>Sort by Name</button>
//         <button onClick={sortByBirthday}>Sort by Birthday</button>
//       </div>
//       <div className="card-container">
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map((user) => (
//             <div key={user.id} className="user-card">
//               <h2>{user.name}</h2>
//               <p>Birthday: {user.birthday}</p>
//               <p>Bio: {user.bio}</p>
//             </div>
//           ))
//         ) : (
//           <p>No users found.</p>
//         )}
//       </div>
//     </main>
//   );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        Select a State:
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
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    bio: '',
    location: '', // Update the field name to 'location'
  });

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
      setFormData({ name: '', birthday: '', bio: '', location: '' }); // Clear the form
    } catch (error) {
      console.error('Error adding a new user:', error);
    }
  };

  return (
    <div className="user-form">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Birthday:
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </label>
        <StatesList onStateSelected={handleStateSelected} />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
