import React, { useState } from "react";
import axios from "axios";
import "./AddProfile.css";
import { Link } from "react-router-dom";


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
    <h1>hi</h1>
  );
}
