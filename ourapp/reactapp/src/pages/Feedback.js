import React, { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

// import { useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import "./Feedback.css";

export default function Feedback() {
  // Define categories
  const [categories, setCategories] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/categories`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data.map(item => item.descriptor));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);


  // get users
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
  const [users, setUsers] = useState({
    receiver: receiver?.id || 0,
    sender: user?.id, 
  });

  // Initialize ratings state with categories
  const [ratings, setRatings] = useState(
    categories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {})
  );

  // Handle rating change
  const handleRatingChange = (category) => (event) => {
    setRatings({ ...ratings, [category]: parseInt(event.target.value, 10) });
  };

  const handleSubmit = async (e) => {
    for(let i = 0; i < categories.length; i++) {
      e.preventDefault();
      try {
        console.log(categories[i]);
        console.log(ratings[categories[i]]);
        await axios.post("http://localhost:3000/feedbacks", {
          feedback: {
            "receives_uid": users.receiver,
            "gives_uid": users.sender,
            "feedback": ratings[categories[i]],
            "category": categories[i]
          } 
        });
      } catch (error) {
        console.error("Error adding feedback:", error);
      }
      setIsSubmitted(true)
    }
  };
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };


  return (
    <main className="main-container">
        <h1>User Feedback Form</h1>

      {!isSubmitted ? (<><h1>Feedback</h1>
        {/* <h1>What is your feedback about {receiver?.name}?</h1> */}

        <p> Hello {user?.name.split(" ")[0]}, provide feedback about a specific user: {receiver?.name} </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="user_to_feedback">User to Provide Feedback About: {receiver?.name.split(" ")[0]}</label>

          <br></br>

          {categories.map((category) => (
            <div key={category}>
              <Typography component="legend">{category}</Typography>
              <Rating
                name={category}
                value={ratings[category]}
                onChange={handleRatingChange(category)}
              />
            </div>
          ))}
          
          <input type="submit" value="Submit Feedback"/>
        </form>
</>):(<><p>You've submitted the form!</p> <button onClick={goBack}>Back</button></>)}
        
        
    </main>
  );
}

