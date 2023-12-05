import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/contexts/UserContext";
import ForgotPassword from "./ForgotPassword";
import CreateProfile from "./CreateProfile.js";
import axios from "axios";
// import bcrypt from "bcrypt";
import "./UserLogin.css";
import ResetRequest from "./ResetRequest";

export default function UserLogin() {
  // State hooks
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true); // Show sign-in by default
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Context
  const { user, setUser } = useContext(UserContext);

  // Navigation hook
  const navigate = useNavigate();

  // Handlers
  const toggleForgotPassword = () => setShowForgotPassword((prev) => !prev);
  const toggleSignIn = () => {
    setShowSignIn(!showSignIn);
    setShowSignUp(false);
  };
  const toggleSignUp = () => {
    const willShowSignUp = !showSignUp;
    setShowSignUp(willShowSignUp);
    if (willShowSignUp) {
      navigate("/SignUp");
    } else {
      setShowSignIn(true);
    }
  };
  const handleSignUp = () => {
    // TODO: SignUp logic
  };

  const initializeUser = () => {
    fetch("http://localhost:3000/test_users/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((authData) => {
        if (authData.authenticated != false) {
          setUser((prevUser) => ({ ...prevUser, ...authData }));
          sessionStorage.setItem("user", JSON.stringify(authData));
          localStorage.setItem("username", username);
          setLogin(true);
          navigate("/UserSignedIn");
          clearInputFields();
        } else {
          // Authentication failed
          setErrorMessage("Invalid username or password. Please try again.");
          clearInputFields();
        }
      })
      .catch((error) => {
        console.error("Failed to authenticate user:", error);
        setErrorMessage("There was an issue logging in. Please try again.");
        clearInputFields();
      });
  };
  

  /*
  const initializeUser = () => {
    axios.post("http://localhost:3000/test_users/authenticate", {
      test_user: {
        name: username,
        password: password,
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    /*
    fetch("http://localhost:3000/test_users/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      */ /*
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.success) {
          setUser((prevUser) => ({ ...prevUser, ...data.user }));
          sessionStorage.setItem("user", JSON.stringify(data.user));
          navigate("/UserSignedIn");
          setLogin(true);
          clearInputFields();
        } else {
          setErrorMessage("Invalid username or password. Please try again.");
          clearInputFields();
          // Handle non-existing user logic here, if needed
        }
      })
      .catch((error) => {
        console.error("Failed to initialize user:", error);
        setErrorMessage("There was an issue logging in. Please try again.");
        clearInputFields();
      });
  };
  
  
  
  const initializeUser = () => {
    // User initialization logic
    fetch(`http://localhost:3000/test_users/find_by_username/${username}`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUser((prevUser) => ({ ...prevUser, ...data }));
          sessionStorage.setItem("user", JSON.stringify(data));
          navigate("/UserSignedIn");
          setLogin(true);
          clearInputFields();
        } else {
          setErrorMessage("Invalid username or password. Please try again.");
          clearInputFields();
          // Handle non-existing user logic
        }
      })
      .catch((error) => console.error("Failed to initialize user:", error));
    // console.error("Failed to initialize user:", error);
    setErrorMessage("There was an issue logging in. Please try again.");
    clearInputFields();
  };
  */

  const clearInputFields = () => {
    setUsername("");
    setPassword("");
  };

  // Effects
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLogin(true);
    }
  }, [setUser]);

  // Render helpers
  const renderSignUpButton = () =>
    showSignIn &&
    !showForgotPassword && (
      <button className="user-init-button" onClick={toggleSignUp}>
        Sign Up
      </button>
    );

  // Component render
  return (
    <main className="main-login-container">
      <div className="hero-login-section">
        <div className="hero-login-title">Welcome to Heartcoded</div>
        <p className="hero-login-subtitle">Find your soulmate today!</p>
        <div className="user-login-init-container">
          {showSignIn && (
            <div>
              <input
                className="user-init-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                onKeyDown={(e) => e.key === "Enter" && initializeUser()}
              />
              <input
                type="password"
                className="user-init-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                onKeyDown={(e) => e.key === "Enter" && initializeUser()}
              />
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}

              <button className="user-init-button" onClick={initializeUser}>
                Sign In
              </button>
            </div>
          )}
          {showSignIn && (
            <>
              <button
                className="forgot-password-toggle"
                onClick={toggleForgotPassword}
              >
                Forgot Password?
              </button>
              {showForgotPassword && <ResetRequest />}
            </>
          )}
          {renderSignUpButton()}
          {showSignUp && (
            <>
              <CreateProfile />
              <button onClick={toggleSignIn}>
                Already have an account? Sign In
              </button>
            </>
          )}
          {/* {showForgotPassword && <ForgotPassword />} */}
        </div>
      </div>
    </main>
  );
}