import React, { useState, useEffect, useContext } from "react";
import "./UserLogin.css";
import { useNavigate } from 'react-router-dom';


import axios from "axios";
import { useHistory } from "react-router-dom"; 
// const history = useHistory();
import { Link } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";

import ForgotPassword from "./ForgotPassword";
import CreateProfile from "./CreateProfile.js";

export default function UserSignedIn() {

  // const [question, setQuestion] = useState("UNINIT");
  const [testUser, setTestUser] = useState("UNINIT");

  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  console.log("UserContext:", UserContext);
console.log("User from context:", user);

useEffect(() => {
    // When the component mounts, check if the user is stored in sessionStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the string back to an object and set it in the context
      setLogin(true); // If necessary, set the login state
    }
  }, [setUser]); // Dependency array to run the effect when setUser changes, which is likely only on mount
  


  // const history = useHistory();
  const navigate = useNavigate();
return(
    <div>
<div className="features">
{user && user.name && ( // Check if user and user.name are not null before rendering
        <h1> Welcome, {user.name}</h1>
      )}
    
      <Link to={{
        pathname: '/CreateProfile',
        state: { data: user }
      }}>
          <div className="feature-card">
            <h2>Create Profile</h2>
            <p>
              Personalize your space. Add a profile picture, write a bio, and
              list your interests for potential matches to see.
            </p>
          </div>
        </Link>

        <Link to="/FindMatch">
          <div className="feature-card">
            <h2>View Current Matches</h2>
            <p>View your current matches!</p>
          </div>
        </Link>
        <Link to="/Chat">
          <div className="feature-card">
            <h2>Chat & Connect</h2>
            <p>
              Engage in live chats, get prompted conversation starters, and
              decide if you're ready to take the next step with your match.
            </p>
          </div>
        </Link>
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
        <Link to="SelectUserForFeedback">
          <div className="feature-card">
            <h2>Give Feedback</h2>
            <p>
              Rate your matches and share your thoughts. Your feedback helps us
              refine the matching process for an enhanced experience.
            </p>
          </div>
        </Link>
        {/* hello */}
      </div>

 
    </div>
)
    

}
