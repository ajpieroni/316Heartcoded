import React, { useState } from "react";
import axios from "axios";
import "./AddProfile.css";

export default function UserForm({ onUserAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    bio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/test_users", formData);
      onUserAdded(response.data); // Update the user list with the new user
      setFormData({ name: "", birthday: "", bio: "" }); // Clear the form
    } catch (error) {
      console.error("Error adding a new user:", error);
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
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
