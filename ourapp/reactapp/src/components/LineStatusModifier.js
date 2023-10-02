import React, { useState, useEffect, useContext } from "react";
import "./LineStatusModifier.css";
import { LineStatusContext } from "./contexts/LineStatusContext";
import {UserContext} from "./contexts/UserContext";
import axios from "axios";

export default function LineStatusModifier() {
  const {inputColor, setInputColor, lastUpdatedColor, setLastUpdatedColor} = useContext(LineStatusContext);
  const {displayName} = useContext(UserContext);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleStatusChange = (newStatus) => {
    if (selectedStatus === newStatus) {
      // If the clicked status is already selected, remove the selection
      setSelectedStatus(null);
    } else {
      setSelectedStatus(newStatus);
    } 
  };

  const handleConfirmSelection = () => {
    axios
      .post(`${process.env.REACT_APP_LOCAL_HOST}/api/line_statuses`, {
        admin: displayName,
        color: selectedStatus,
      })
      .then((response) => {
        // Handle the successful response
        console.log("Line status posted successfully");
        // Perform any other necessary actions after posting the message
      })
      .catch((error) => {
        // Handle the error
        console.log("Error posting latest status:", error);
      });
    setInputColor(selectedStatus);
    // do axios to store input message
    const dateObject = new Date();
    const formattedDate = `${dateObject.toLocaleDateString()}, ${dateObject.toLocaleTimeString()}`;
    setLastUpdatedColor(formattedDate);
    setSelectedStatus(null); // Clear the input after updating the message
  };

  const isClosed = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Check if it's a weekend (Saturday or Sunday)
    const isWeekend = currentDay === 0 || currentDay === 6;

    // Check if it's before 8:30 AM or after 5 PM on weekdays
    const isBeforeWorkingHours = !isWeekend && currentHour < 8 || (currentHour === 8 && currentMinute < 30);
    const isAfterWorkingHours = !isWeekend && currentHour >= 17;

    return isWeekend || isBeforeWorkingHours || isAfterWorkingHours;
  }

  useEffect(() => {
    if(isClosed()){
      setInputColor("grey");
    }
  }, []);

  return (
    <>
      <div className="mod-wrapper">
        <div className="status-selector">
          <div
            aria-label="Circle is red"
            className={`circle red ${
              selectedStatus === "red" ? "selected" : ""
            }`}
            onClick={() => handleStatusChange("red")}
          ></div>
          <div
            aria-label="Circle is yellow"
            className={`circle yellow ${
              selectedStatus === "yellow" ? "selected" : ""
            }`}
            onClick={() => handleStatusChange("yellow")}
          ></div>
          <div
            aria-label="Circle is green"
            className={`circle green ${
              selectedStatus === "green" ? "selected" : ""
            }`}
            onClick={() => handleStatusChange("green")}
          ></div>
          
        </div>
        <button onClick={handleConfirmSelection} disabled={!selectedStatus}>
            Confirm
          </button>
      </div>

      
      <p id="curr-clr">Selected color: {selectedStatus}</p>
    </>
  );
}
