import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import { Link } from "react-router-dom";
// import "./UserLogin.css";
import axios from "axios";

export default function SelectUserForFeedback({ feedbackForm }) {
  const [matchNames, setMatchNames] = useState([]);
  const { user, setUser } = useContext(UserContext);
  // const currentUser = user?.id;
  // const [currentName, setCurrentName] = useState("");
  // const { user, setUser } = useContext(UserContext);
  const [ellipsisDots, setEllipsisDots] = useState(1);
  //   !Loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisDots((dots) => (dots < 3 ? dots + 1 : 1));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const currentUser = user?.id;
  const [currentName, setCurrentName] = useState("");
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      //   setLogin(true); // If necessary, set the login state
    }
  }, [setUser]);

  const fetchUserNameById = (id) => {
    return fetch(`http://localhost:3000/test_users/${id}`)
      .then((response) => response.json())
      .then((data) => data.name)
      .catch((error) => console.error("Error fetching user:", error));
  };
  // const fetchUserById = (id) => {
  //   return fetch(`http://localhost:3000/test_users/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => data.name)
  //     .catch((error) => console.error("Error fetching user:", error));
  // };
  // !TODO: alex fix with loading whole user object

  fetch(`http://localhost:3000/matched_withs/users/${currentUser}`)
    .then((response) => response.json())
    .then(async (matches) => {
      const myName = await fetchUserNameById(currentUser);
      setCurrentName(myName);
      const names = [];
      for (let match of matches) {
        const otherUserId =
          match.uid1 === currentUser ? match.uid2 : match.uid1;
        const name = await fetchUserNameById(otherUserId);
        names.push(name);
        // console.log(`here are names ${names}`);
      }
      setMatchNames(names);
    })
    .catch((error) => console.error("Error fetching matches:", error))
    .finally(()=> setLoading(false));

  return (
    <main className="main-container">
      <h1>Hi {user?.name}! Here are your current Matches</h1>
      {loading ? (<div className="loading">
            Loading{".".repeat(ellipsisDots)}
          </div>): ( <ul>
        {matchNames.map((name, index) => (
          <Link to="/Feedback" myUID={currentUser} theirUID={name}>
            <li key={index}>{name}</li>
          </Link>
        ))}
      </ul>)}
     
    </main>
  );
}
