import React, { useState, useEffect, useRef, createContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import headerRef
import UserLanding from "./pages/UserLanding";
import "./App.css";
import axios from "axios";


function App() {
  // const fetchLatestMessage = () => {
  //   fetch(`${process.env.REACT_APP_LOCAL_HOST}/api/admin_messages`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const latestIndex = data.length - 1;
  //       const latestMessage = data[latestIndex].message;
  //       setInputMessage(latestMessage);
  //       const updatedAt = data[latestIndex].updated_at;
  //       const dateObject = new Date(updatedAt);
  //       const formattedDate = `${dateObject.toLocaleDateString()}, ${dateObject.toLocaleTimeString()}`;
  //       setLastUpdatedMessage(formattedDate);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching the latest message:", error);
  //     });
  // };

  // useEffect(() => {
  //   fetchLatestMessage();
  // }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserLanding />} />
      </Routes>
    </Router>
  );
}

export default App;
