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
import MatchList from "../components/MatchList";
import Header from "../components/Header";
import Chat from "./Chat";

export default function Conversations() {

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
      <Header />
        <h1>{user?.name}'s Conversations 🕺</h1>
        <MatchList />
        
        {/* <Chat /> */}

 
    </div>
)
    

}
