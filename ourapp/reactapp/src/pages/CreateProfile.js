import React, { useState, useEffect } from "react";
import "./UserLanding.css";
import axios from "axios";

export default function CreateProfile() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  const fetchData = () => {
    fetch(`http://localhost:3000/test_users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Error fetching the question:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortByName = () => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  };

  const sortByBirthday = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const dateA = new Date(a.birthday);
      const dateB = new Date(b.birthday);
      return dateA - dateB;
    });
    setUsers(sortedUsers);
  };

  // filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="main-container">
      <h1>List of Users from Admin View</h1>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="button-container">
        <button onClick={sortByName}>Sort by Name</button>
        <button onClick={sortByBirthday}>Sort by Birthday</button>
      </div>
      <div className="card-container">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <h2>{user.name}</h2>
              <p>Birthday: {user.birthday}</p>
              <p>Bio: {user.bio}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </main>
  );
}
