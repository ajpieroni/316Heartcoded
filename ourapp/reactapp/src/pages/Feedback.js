import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import "./Feedback.css";
import axios from "axios";


export default function Feedback({feedbackForm}) {
  const [loading, setLoading] = useState(true);
  const [ellipsisDots, setEllipsisDots] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisDots((dots) => (dots < 3 ? dots + 1 : 1));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const myUID = parseInt(searchParams.get("myUID"));
  const theirUID = parseInt(searchParams.get("theirUID"));

  const { user, setUser } = useContext(UserContext);
  const [receiver, setReceiver] = useState(null);

  //GET http://localhost:3000/test_users/{theirUID}
  useEffect(() => {
    fetch(`http://localhost:3000/test_users/4`)
      .then(response => response.json())
      .then(data => {
        setReceiver(data);
      })
      .catch(error => {
        console.error("Error fetching receiver:", error);
      });
  }, []);


  //const [feedback, setFeedback] = useState(0);

  const [formData, setFormData] = useState({
    receives_uid: theirUID,
    gives_uid: myUID,
    feedback: 0,
    category: "",
  });


// GET /feedbacks/find_feedback?gives_uid=1&receives_uid=2
// http://localhost:3000/feedbacks/find_feedback?gives_uid=1&receives_uid=2

  /*
  const fetchData = () => {
    fetch(`http://localhost:3000/feedbacks/find_feedback?gives_uid=1&receives_uid=2`)
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
  */

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
      const response = await axios.post("http://localhost:3000/feedbacks", {feedback: {
        "receives_uid": formData.receives_uid,
		    "gives_uid": formData.gives_uid,
		    "feedback":  formData.feedback, 
		    "category": formData.category  
      }
    });
      // feedbackForm(response.data);
      setFormData({...formData, feedback: 0, category: ""}); 
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  /*
  useEffect(() => {
    fetchData();
    console.log("users: ", users);
    console.log("formData: ", formData);
  }, []);

  const fetchUserNameById = (id) => {
    return fetch(`http://localhost:3000/test_users/${id}`)
        .then((response) => response.json())
        .then((data) => data.name)
        .catch((error) => console.error("Error fetching user:", error));
  };
  */

  // set sender to user?.name

  return (
    <main className="main-container">
        <h1>Feedback</h1>
        <h1>Hello {user?.username}, provide feedback about a specific user: {receiver?.username}</h1>

        <h1>User Feedback Form</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="user_to_feedback">User to Provide Feedback About: {receiver?.username}</label>

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

