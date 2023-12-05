import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";
import { useEffect } from "react";

const DeleteProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [confirmation, setConfirmation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    //   setLogin(true);
    }
  }, []);

  const handleDelete = async () => {
    if (confirmation === "DELETE") {
      try {
        if (!user || !user.id) {
          console.error("User ID is not available.");
          return;
        }

        const response = await axios.delete(
          `http://localhost:3000/test_users/${user?.id}`
        );

        if (response.status === 200) {
          console.log("User deleted successfully");
          // Here you should also clear the user context and any stored sessions
          setUser(null);
          sessionStorage.removeItem("user");
          localStorage.removeItem("username");
          navigate("/"); 
        } else {
          console.error("Failed to delete user");
          navigate("/"); 
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        navigate("/"); 
      }
    }
    if(confirmation !== "DELETE"){
        alert("Be sure to type 'DELETE'");
    }
    
    
  };

  return (
    <div>
      <h1>Delete Your Profile</h1>
      <input
        type="text"
        placeholder="Type DELETE to confirm"
        value={confirmation}
        onChange={(e) => setConfirmation(e.target.value)}
      />
      <button onClick={handleDelete}>Confirm Deletion</button>
    </div>
  );
};

export default DeleteProfile;
