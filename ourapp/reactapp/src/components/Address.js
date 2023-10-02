import React, { useState, useContext, useEffect } from "react";
import "./Address.css";
import { UserContext } from "./contexts/UserContext";
import { useMediaQuery } from "@mui/material";

export default function Address() {
  const [isLoading, setIsLoading] = useState(true);
  const { boxNumber, displayName } = React.useContext(UserContext);

  useEffect(() => {
    if (displayName) {
      setIsLoading(false);
    }
  }, [displayName]);

  const [ellipsisDots, setEllipsisDots] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisDots((dots) => (dots < 3 ? dots + 1 : 1));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div
      role="region"
      aria-label="Address"
      className={`Address ${isMobile ? "mobile" : ""}`}
    >
      <h2>Your Address</h2>

      <div className="address-text">
        <p> {isLoading ? `Loading${".".repeat(ellipsisDots)}` : displayName}</p>
        <a href="https://postoffice.duke.edu/addressing-mail/dormitory-street-addresses/">
          <p>Street Address</p>
        </a>
        <p>Building, Dorm, Box #{boxNumber}</p>
        <p>Durham, NC</p>
        <p>27708-0000</p>
        <br></br>
        <a href="https://postoffice.duke.edu/student-mail/">
          <p>How to Address Your Mail</p>
        </a>
      </div>
    </div>
  );
}
