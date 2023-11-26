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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  console.log("UserContext:", UserContext);
console.log("User from context:", user);

useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
      setLogin(true); 
    }
  }, [setUser]); 


  // const history = useHistory();
  const navigate = useNavigate();
return(
    <div>
<div className="features">
  <Header />
        <div class = "welcome-message"> {user?.name}'s Dashboard</div>
    
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
        {/* hello */}
      </div>

 
    </div>
)
    

}
