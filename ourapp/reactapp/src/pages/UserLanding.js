import React, { useState, useEffect, useContext } from "react";
import "./UserLanding.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";
// import bcrypt from 'bcryptjs';



export default function UserLanding() {
  const [question, setQuestion] = useState("UNINIT");
  const [testUser, setTestUser] = useState("UNINIT");
  const [error, setError] = useState(null);
  const {user,setUser} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);

  // const initializeUser = () => {
  //   console.log("pressed");
  //   fetch(`http://localhost:3000/test_users/find_by_username/${username}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data && bcrypt.compareSync(password, data.password_digest)) {
  //         setUser((prevUser) => ({
  //           ...prevUser,
  //           name: data.name,
  //           id: data.id,
  //           birthday: data.birthday,
  //         }));
  //         sessionStorage.setItem("user", JSON.stringify(data));
  //         console.log("User authenticated successfully:", data);
  //         setLogin(true);
  //       } else {
  //         console.log("Invalid username or password");
  //         setError("Invalid username or password. Please try again.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Failed to initialize user:", error);
  //     });
  //   };


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
            gender: data.gender,
            preferences: data.preferences,
            bio: data.bio,
            location: data.location,
            password: data.password,
            red_flags: data.red_flags
          }));
          sessionStorage.setItem("user", JSON.stringify(data));
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
  //     .then((data) => setTestUser(data.name)) password(data.hashed_p)
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

          <Link to="/ForgotPassword">
            Forgot Password?
          </Link>

          <button className="user-init-button" onClick={initializeUser}>
            Sign In
          </button>
          
          <Link to ='/SignUp'>
            Don't have an account yet? Sign up now
          </Link>
          
          {error && <p className="error-message">{error}</p>}

          {/* <h2> */}
            <h2>
              {login
                ? `Logged in as: ${user?.name}, Birthday: ${user?.birthday}, ID: ${user?.id}`
                : "Not Logged In"}
            {/* </h2> */}
          </h2>

        </div>
      </div>

      <div className="features">
        <Link to="/CreateProfile">
          <div className="feature-card">
            <h2>Edit Profile</h2>
            <p>
              Personalize your space. Add a profile picture, write a bio, and
              list your interests for potential matches to see.
            </p>
          </div>
        </Link>

        <Link to="/FindMatch">
          <div className="feature-card">
            <h2>Matches</h2>
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
        <Link to="/Wrapped">
          <div className="feature-card">
            <h2>WRAPPED</h2>
            <p>
              Check out your Heartcoded insights!
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

