import React, { useState, useEffect, useContext } from "react";
import "./UserLanding.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";

export default function UserLanding() {
  const [question, setQuestion] = useState("UNINIT");
  const [testUser, setTestUser] = useState("UNINIT");
  const {setUser} = useContext(UserContext);
  const [username, setUsername] = useState('');

  const initializeUser = () => {
    console.log("pressed");
    fetch(`http://localhost:3000/test_users/find_by_username/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUser(data);
          console.log(data);
        } else {
          // Handle non-existing user, if needed
        }
      })
      .catch((error) => {
        console.error("Failed to initialize user:", error);
      });
  }

  // const fetchQuestion = () => {
  //   fetch(`http://localhost:3000/questions/1`)
  //     .then((response) => response.json())
  //     .then((data) => setQuestion(data.question))
  //     .catch((error) => {
  //       console.error("Error fetching the question:", error);
  //     });
  // };

  // const fetchUserName = () => {
  //   fetch(`http://localhost:3000/test_users/10`)
  //     .then((response) => response.json())
  //     .then((data) => setTestUser(data.name))
  //     .catch((error) => {
  //       console.error("Error fetching the user name:", error);
  //     });
  // };

  // useEffect(() => {
  //   fetchUserName();
  //   fetchQuestion();
  // }, []);

  return (
    <main className="main-container">
      <h1 className="main-title">{question}</h1>
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
          <button className="user-init-button" onClick={initializeUser}>
            Initialize User
          </button>
        </div>
      </div>

      <div className="features">
        <Link to="/CreateProfile">
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
            <h2>Find Your Match</h2>
            <p>
              Answer tailored questions to help us find the best match for you.
              New questions added weekly to refine your matches!
            </p>
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
        <Link to="Feedback">
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

      <div className="cta-section">
        <h2 className="cta-title">Ready to find your match?</h2>
        <button className="cta-button">{testUser}</button>
      </div>
    </main>
  );
}
