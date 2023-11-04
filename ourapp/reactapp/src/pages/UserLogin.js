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

export default function UserLogin() {
  
  // const [question, setQuestion] = useState("UNINIT");
  const [testUser, setTestUser] = useState("UNINIT");

  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  // const history = useHistory();
  const navigate = useNavigate();


  const initializeUser = () => {
    console.log("pressed");
    fetch(`http://localhost:3000/test_users/find_by_username/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUser((prevUser) => ({
            ...prevUser,
            name: data.name,
            id: data.id,
            birthday: data.birthday,
          }));
          sessionStorage.setItem("user", JSON.stringify(data));
          // setTestUser(user)
          // history.push("/signed-in");
          navigate('/UserSignedIn');
          console.log("here is data", data);
          console.log(data.name);
          setLogin(true);
        } else {
          // Handle non-existing user, if needed
        }
      })
      .catch((error) => {
        // setUser("Failed to login")
        console.error("Failed to initialize user:", error);
      });
  };
  useEffect(() => {
    // Check if there's user data in sessionStorage on component initialization
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLogin(true);
    }
  }, []);

  // useEffect(() => {
  //   fetchUserName();
  //   fetchQuestion();
  // }, []);

  return (
    <main className="main-container">
      {/* <img src={Image}/> */}
      {/* <h1 className="main-title">{question}</h1> */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome to HeartCoded</h1>
        <p className="hero-subtitle">Find your soulmate today!</p>
        {/* <button className="cta-button">Sign Up Now</button> */}
        {/* User init */}
        <div className="user-init-container">
          <input
            className="user-init-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
          <input
            type="password"
            className="user-init-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <button className="user-init-button" onClick={initializeUser}>
            Initialize User
          </button>

          <ForgotPassword />

          <h2>
            {login
              ? `Logged in as: ${user?.name}, Birthday: ${user?.birthday}, ID: ${user?.id}`
              : "Not Logged In"}
          </h2>
        </div>
      </div>

      

      <div className="cta-section">
        <h2 className="cta-title">Ready to find your match?</h2>
        <button className="cta-button">{testUser}</button>
      </div>
    </main>
  );
}
