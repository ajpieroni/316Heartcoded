import React, { useState, useEffect } from "react";
// import "./UserLanding.css";
import axios from "axios";

export default function FindMatch() {
  const [matches, setMatches] = useState([]);
  const currentUser = 53;

  const fetchData = () => {
    fetch(`http://localhost:3000/matched_withs/users/${currentUser}`)
      .then((response) => response.json())
      .then((data) => {
        setMatches(data);
        console.log("here is data", data);
      }
      )
      .catch((error) => {
        console.error("Error fetching the question:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="main-container">
        <h1>Current Matches</h1>
        <ul>
          {matches.map(match => (
            <li key={match.id}>
              UID1: {match.uid1}, UID2: {match.uid2}, Status: {String(match.status)}, Date: {match.date}
            </li>
          ))}
        </ul>
    </main>
  );
}
