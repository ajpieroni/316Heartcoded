import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import "./Feedback.css";
import axios from "axios";


export default function Feedback() {
  const [feedback, setFeedback] = useState();
  const [receiver, setReceiver] = useState();
  const [sender, setSender] = useState();
  const [category, setCategory] = useState();
  const { user, setUser } = useContext(UserContext);

  //!
  const fetchUserNameById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/test_users/${id}`);
      const data = await response.json();
      console.log("Fetched user data:", data);
      return data.name;
    } catch (error) {
      console.error("Error fetching the user:", error);
    }
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/feedbacks/${user?.id}`);
      const data = await response.json();
      setFeedback(data.feedback);
      setReceiver(data.receives_uid);
      setSender(data.gives_uid);
      setCategory(data.category);
      
      const receiverName = await fetchUserNameById(data.receives_uid);
      console.log("reciever name", receiverName);
      setReceiver(receiverName); 
  
      const senderName = await fetchUserNameById(data.gives_uid);
      console.log("sender name", senderName);
      setSender(senderName);
    } catch (error) {
      console.error("Error fetching the feedback:", error);
    }
  };
//!  
  useEffect(() => {
    fetchData();
    console.log("hello");
    console.log(feedback);
    console.log(user);
    console.log(user?.id);
    fetchUserNameById();
  }, []);

  // set sender to user?.name

  return (
    <main className="main-container">
      <h1>Feedback</h1>
      <h1>What is your feedback about {receiver}?</h1>
      <p>
        {" "}
        Hello {sender}, provide feedback about a specific user, {receiver}
        {/* , in
        category: {category} */}
      </p>

      <p>Your prior feedback was: {feedback}</p>

      <h1>User Feedback Form</h1>
      
      <form action="submit_feedback.php" method="post">
        <label htmlFor="user_to_feedback">
          User to Provide Feedback About: {receiver}
        </label>
        <br></br>

        <label htmlFor="feedback">Feedback:</label>
        <br></br>

        <textarea
          id="feedback"
          name="feedback"
          rows="4"
          cols="50"
          required
        ></textarea>
        <br></br>

        <input type="submit" value="Submit Feedback" />
      </form>
    </main>
  );
}
