import React, { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import axios from "axios";
import { UserContext } from "../components/contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import "./Feedback.css";
import Header from "../components/Header";

export default function Feedback() {
  // Define categories
  const [categories, setCategories] = useState([]);

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

  // users involved in feedback
  const [users, setUsers] = useState({
    receiver: receiver?.id || 0,
    sender: user?.id, 
  });

  // check if feedback has already been given
  const [hasFeedback, setHasFeedback] = useState(false);

  const checkIfHasFeedback = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/feedbacks/find_feedback?gives_uid=${users.sender}&receives_uid=${users.receiver}`);
      setHasFeedback(true);
    } catch (error) {
      setHasFeedback(false);
    }
  };

  useEffect(() => {
    checkIfHasFeedback();
  }, []);

  // Initialize ratings state with categories
  const [ratings, setRatings] = useState(
    categories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {})
  );

  // Log ratings whenever it changes
  useEffect(() => {
    console.log(ratings);
  }, [ratings]);

  // Handle rating change
  const handleRatingChange = (category) => (event) => {
    setRatings({ ...ratings, [category]: parseInt(event.target.value, 10) || 0});
  };

  // Handle submit
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = async (e) => {
    for(let i = 0; i < categories.length; i++) {
      e.preventDefault();
      try {
        console.log(categories[i]);
        console.log(ratings[categories[i]]);
        await axios.post("http://localhost:3000/feedbacks", {
          feedback: {
            "receives_uid": users.receiver,
            "gives_uid": user.id,
            "feedback": ratings[categories[i]] || 0,
            "category": categories[i]
          } 
        });
      } catch (error) {
        console.error("Error adding feedback:", error);
      }
      setIsSubmitted(true)
    }
  };

  // Go back
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const marks = [
    {
      value: 0,
      label: 'Not at all',
    },
    {value: 1}, {value: 2}, {value: 3}, {value: 4},
    {
      value: 5,
      label: 'Average amount',
    },
    {value: 6}, {value: 7}, {value: 8}, {value: 9},
    {
      value: 10,
      label: 'A lot',
    }
  ];


  return (
    <>
    <Header/>
    <main className="main-container">
      <h1 className="main-title">User Feedback Form</h1>

      {!isSubmitted && !hasFeedback ? (
        <>
        <form className="feedback-form" onSubmit={handleSubmit}>
          {categories.map((category) => (
            <div className="feedback-q" key= {category}>
              <Typography className="how-much" id="discrete-slider" gutterBottom style={{ fontFamily: "'Varela Round', sans-serif" }}>
                How much does {receiver?.name} care about {category?.toLowerCase()}?
              </Typography>
              <br></br>
              <Slider
                defaultValue={0}
                value={ratings[category] || 0}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                step={1}
                min={0}
                max={10}
                marks={marks}
                color="secondary"
                onChange={handleRatingChange(category)}
              />
            </div>
          ))}
          
          <input type="submit" value="Submit Feedback"/>
        </form>
    </>): hasFeedback ? (
      <><p className="feedback-font">You've already submitted feedback about {receiver?.name}!</p> <button onClick={goBack}>Back</button></>
    ) : (
      <><p className="feedback-font">You've submitted the form!</p> <button onClick={goBack}>Back</button></>
    )}
        
        
    </main>
    </>
  );
}


