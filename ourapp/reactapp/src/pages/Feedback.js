import React, { useState, useEffect, useContext } from "react";
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import axios from "axios";
import { UserContext } from "../components/contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import "./Feedback.css";

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
    <main className="main-container">
        <h1>User Feedback Form</h1>

      {!isSubmitted ? (<><h1>Feedback</h1>
        {/* <p> Hello {user?.name.split(" ")[0]}, provide feedback about your match: {receiver?.name} </p> */}

        <form onSubmit={handleSubmit}>
          {categories.map((category) => (
            <div key= {category}>
              <Typography id="discrete-slider" gutterBottom>
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
</>):(<><p>You've submitted the form!</p> <button onClick={goBack}>Back</button></>)}
        
        
    </main>
  );
}


