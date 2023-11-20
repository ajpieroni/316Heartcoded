import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import { Link } from "react-router-dom";
// import "./UserLogin.css";
import axios from "axios";

export default function SelectUserForFeedback({ feedbackForm }) {
  const [matchIds, setMatchIds] = useState([]);
  const { user, setUser } = useContext(UserContext);
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
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      //   setLogin(true); // If necessary, set the login state
    }
  }, [setUser]);


  fetch(`http://localhost:3000/matched_withs/users/${currentUser}`)
    .then((response) => response.json())
    .then(async (matches) => {
      const ids = [];
      for (let match of matches) {
        const otherUserId =
          match.uid1 === currentUser ? match.uid2 : match.uid1;
        ids.push(otherUserId);
      }
      setMatchIds(ids);
    })
    .catch((error) => console.error("Error fetching matches:", error))
    .finally(()=> setLoading(false));
  return (
    <main className="main-container">
      <h1>Hi {user?.name}! Here are your current Matches</h1>
      {loading ? (<div className="loading">
            Loading{".".repeat(ellipsisDots)}
          </div>): ( <ul>
        {matchIds.map((id, index) => (
          <Link to={`/Feedback?myUID=${currentUser}&theirUID=${id}`}>
            <li key={index}>{id}</li>
          </Link>
        ))}
      </ul>)}
     
    </main>
  );
}
