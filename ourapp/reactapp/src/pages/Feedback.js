import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/contexts/UserContext";
import "./Feedback.css";
import Header from "../components/Header";

export default function Feedback({ feedbackForm }) {
  const location = useLocation();
  const { receiver } = location.state || {};

  // current user
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  // states
  const [loading, setLoading] = useState(true);
  const [ellipsisDots, setEllipsisDots] = useState(1);
  const [users, setUsers] = useState({
    receiver: receiver?.id || 0,
    // !TODO: change sender to current user
    sender: user?.id,
  });
  const [feedback, setFeedback] = useState(0);
  const [formData, setFormData] = useState({
    receives_uid: users.receiver,
    gives_uid: users.sender,
    feedback: feedback,
    category: "",
  });

  // effects
  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisDots((dots) => (dots < 3 ? dots + 1 : 1));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (receiver) {
      setUsers((prev) => ({
        ...prev,
        receiver: receiver.id,
      }));
    }
  }, [receiver]);

  useEffect(() => {
    fetchData();
    console.log("users: ", users);
    console.log("formData: ", formData);
  }, []);

  // functions
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/feedbacks/1`);
      const data = await response.json();
      setUsers({
        receiver: data.receives_uid,
        sender: data.gives_uid,
      });
      setFormData({
        ...formData,
        receives_uid: data.receives_uid,
        gives_uid: data.gives_uid,
      });
    } catch (error) {
      console.error("Error fetching the feedback:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeedbackChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, feedback: parseInt(value, 10) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/feedbacks", {
        feedback: {
          receives_uid: formData.receives_uid,
          gives_uid: formData.gives_uid,
          feedback: formData.feedback,
          category: formData.category,
        },
      });
      setFormData({ ...formData, feedback: 0, category: "" });
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  return (
    <main className="main-container">
      <Header />
      {loading ? (
        <div className="loading">Loading{".".repeat(ellipsisDots)}</div>
      ) : (
        <>
          <h1>Feedback</h1>
          <h1>What is your feedback about {receiver?.name}?</h1>

          <h1> {formData.feedback}</h1>

          <h1>User Feedback Form</h1>
          <p>
            {" "}
            Hello {user?.name}, provide feedback about a specific user:{" "}
            {users.receiver} in category: 1
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="user_to_feedback">
              User to Provide Feedback About: {users.receiver}
            </label>

            <br></br>

            <label>
              Feedback
              <Typography component="legend">Feedback</Typography>
              <Rating
                name="feedback"
                type="number"
                value={parseInt(formData.feedback)}
                onChange={handleFeedbackChange}
              />
            </label>

            <br></br>

            <label>
              Category
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
              />
            </label>

            <input type="submit" value="Submit Feedback" />
          </form>
        </>
      )}
    </main>
  );
}
