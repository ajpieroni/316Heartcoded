import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
// import "./UserLanding.css";
import axios from "axios";

export default function Feedback() {
  const [feedback, setFeedback] = useState();


  const fetchData = () => {
    fetch(`http://localhost:3000/feedbacks/1`)
      .then((response) => response.json())
      .then((data) => setFeedback(data.feedback))
      .catch((error) => {
        console.error("Error fetching the feedback:", error);
      });
  };

  useEffect(() => {
    fetchData();
    console.log("hello");
    console.log(feedback);
  }, []);

  return (
    <main className="main-container">
        <h1>Feedback</h1>
        <h1>What is your feedback about {feedback}</h1>
    </main>
  );
}
