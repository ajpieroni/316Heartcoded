import React, { useState, useEffect, useContext } from "react";
import "./UserLogin.css";
import { useNavigate } from 'react-router-dom';
import Conversations from "./Conversations";
import "./UserSignedIn.css"

import axios from "axios";
import { useHistory } from "react-router-dom"; 
// const history = useHistory();
import { Link } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";

import ForgotPassword from "./ForgotPassword";
import CreateProfile from "./CreateProfile.js";
import Header from "../components/Header";

export default function UserSignedIn() {

  // const [question, setQuestion] = useState("UNINIT");
  const [testUser, setTestUser] = useState("UNINIT");

  const { user, setUser } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  console.log("UserContext:", UserContext);
  console.log("User from context:", user);

  const [confirmation, setConfirmation] = useState('');
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

const username = localStorage.getItem("username") || "defaultUsername";
const initializeUser = () => {
  fetch(`http://localhost:3000/test_users/find_by_username/${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        const updatedUser = {
          ...user,
          name: data.name,
          id: data.id,
          birthday: data.birthday,
          gender: data.gender,
          preferences: data.preferences,
          bio: data.bio,
          location: data.location,
          password: data.password,
          red_flags: data.red_flags
        };
        setUser(updatedUser); // Update the context immediately after setting the user data
        sessionStorage.setItem("user", JSON.stringify(data));
      }
    })
    .catch((error) => {
      console.error("Failed to initialize user:", error);
    });
};
  
    useEffect(() => {
      initializeUser(); // Call the initializeUser function if no user data is in sessionStorage
    }, [setUser]);


  const handleDelete = async () => {
    if (confirmation==="DELETE"){
      try {
        if (!user || !user.id) {
          console.error('User ID is not available.');
          return;
        }

        const response = await axios.delete(`http://localhost:3000/test_users/${user.id}`);
    
        if (response.status === 200) {
          console.log('User deleted successfully');
          // Handle successful deletion, e.g., redirect or update state
        } else {
          console.error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
      setConfirmation('');
      setShowConfirmationDialog(false);
      navigate('/');
  }
  };


  // const history = useHistory();
  const navigate = useNavigate();
return(
    <div>
<div className="features">
  <Header />
        <div class = "welcome-message"> {user?.name}'s Dashboard</div>
        {/* <Link to={{
        pathname: '/',
        state: { data: user }
      }}>
        <button
            onClick={handleDelete}
            style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', cursor: 'pointer' }}
          >
            Delete Profile
          </button>
          </Link> */}


  <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={() => setShowConfirmationDialog(true)}
          style={{ backgroundColor: 'red', color: 'white', cursor: 'pointer' }}
        >
          Delete Profile
        </button>
      </div>

      {showConfirmationDialog && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Please enter "DELETE" to confirm:</p>
            <input
              type="text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
            />
            {/* <Link to={{
            pathname: '/',
            state: { data: user }
            }}> */}
              <button onClick={handleDelete} className="modal-button">Confirm</button>
            {/* </Link> */}
            <button onClick={() => setShowConfirmationDialog(false)} className="modal-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
    
      {/* <Link to={{
        pathname: '/EditProfile',
        state: { data: user }
      }}>
          <div className="feature-card">
            <h2>Edit Profile</h2>
            <p>
              Personalize your space. Add a profile picture, write a bio, and
              list your interests for potential matches to see.
            </p>
          </div>
        </Link> */}


        <Link to="/FindMatch">
          <div className="feature-card">
            <h2>View Current Matches</h2>
            <p>View your current matches! </p>
          </div>
        </Link>
        <Link to="/Conversations">
          <div className="feature-card">
            <h2>View All Messages</h2>
            <p>
              Engage in live chats, get prompted conversation starters, and
              decide if you're ready to take the next step with your match.
            </p>
          </div>
        </Link>
        <Link to="/Wingman">
          <div className="feature-card">
            <h2>Wingman</h2>
            <p>
              Talk to your Wingman!
            </p>
          </div>
        </Link>
        {/* <Link to="/Chat">
          <div className="feature-card">
            <h2>Chat & Connect</h2>
            <p>
              Engage in live chats, get prompted conversation starters, and
              decide if you're ready to take the next step with your match.
            </p>
          </div>
        </Link> */}
        <Link to="/Questions">
          <div className="feature-card">
            <h2>Dynamic Questions</h2>
            <p>
              Our system ensures a variety of questions for you. Plus, you can
              answer new ones as they come, keeping your profile fresh and
              engaging.
            </p>
          </div>
        </Link>
        <Link to="/Wrapped">
          <div className="feature-card">
            <h2>Wrapped</h2>
            <p>
             
            </p>
          </div>
        </Link>
        {/* hello */}
      </div>

 
    </div>
)
    

}