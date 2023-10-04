import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
// import "./UserLanding.css";
import axios from "axios";

export default function Feedback() {
  const [feedback, setFeedback] = useState();
  const [receiver, setReceiver] = useState();
  const [sender, setSender] = useState();
  const [category, setCategory] = useState();

  const fetchData = () => {
    fetch(`http://localhost:3000/feedbacks/1`)
      .then((response) => response.json())
      .then((data) => {
        setFeedback(data.feedback);
        setReceiver(data.receives_uid);
        setSender(data.gives_uid);
        setCategory(data.category);
      })
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
        <h1>What is your feedback about {receiver}?</h1>

        <h1> {feedback}</h1>

        <h1>User Feedback Form</h1>
        <p> Hello {sender}, provide feedback about a specific user: {receiver} in category: {category}</p>

        <form action="submit_feedback.php" method="post">
            <label htmlFor="user_to_feedback">User to Provide Feedback About: {receiver}</label>
            <br></br>

            <label htmlFor="feedback">Feedback:</label>
            <br></br>

            <textarea id="feedback" name="feedback" rows="4" cols="50" required></textarea>
            <br></br>

            <input type="submit" value="Submit Feedback"/>
        </form>
    </main>
  );
}
