import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
// import "./UserLanding.css";
import axios from "axios";

export default function Feedback({feedbackForm}) {
  const [users, setUsers] = useState({
    receiver: 0,
    sender: 0,
  });

  const [feedback, setFeedback] = useState(0);

  const [formData, setFormData] = useState({
    receives_uid: users.receiver,
    gives_uid: users.sender,
    feedback: feedback,
    category: "",
  });


  const fetchData = () => {
    fetch(`http://localhost:3000/feedbacks/1`)
      .then((response) => response.json())
      .then((data) => {
        setUsers({
          receiver: data.receives_uid,
          sender: data.gives_uid
        });
        setFormData({
          receives_uid: data.receives_uid,
          gives_uid: data.gives_uid,
          feedback: feedback,
          category: "",
        });
      })
      .catch((error) => {
        console.error("Error fetching the feedback:", error);
      });
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    console.log(name , value);
    setFormData({ ...formData, [name]: value });
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    console.log(name , value);
    setFormData({...formData, feedback: parseInt(value)});
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("formData: ", formData);
      const response = await axios.post("http://localhost:3000/feedbacks", formData);
      feedbackForm(response.data);
      setFormData({ feedback: 0, category: ""}); 
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };


  useEffect(() => {
    fetchData();
    console.log("users: ", users);
    console.log("formData: ", formData);
  }, []);


  return (
    <main className="main-container">
        <h1>Feedback</h1>
        <h1>What is your feedback about {users.receiver}?</h1>

        <h1> {formData.feedback}</h1>

        <h1>User Feedback Form</h1>
        <p> Hello {users.sender}, provide feedback about a specific user: {users.receiver} in category: 1</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="user_to_feedback">User to Provide Feedback About: {users.receiver}</label>

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
          
          <input type="submit" value="Submit Feedback"/>
        </form>

        
    </main>
  );
}

