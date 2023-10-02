import React, { useState, useContext } from "react";
import "./LineStatus.css";
import CircleIcon from "@mui/icons-material/Circle";
import { useMediaQuery } from "@mui/material";
import { LineStatusContext } from "./contexts/LineStatusContext";

const LineStatus = ({ est }) => {
  const { inputColor, setInputColor, lastUpdatedColor, setLastUpdatedColor } = useContext(LineStatusContext);
  //Mobile styling
  const isMobile = useMediaQuery("(max-width: 600px)");

  let corrColor;

  if (inputColor == "red") {
    corrColor = "#C84E00";
  } else if (inputColor == "yellow") {
    corrColor = "#FFD960";
  } else if (inputColor == "green") {
    corrColor = "#A1B70D";
  } else {
    corrColor = "grey";
  }

  return (
    <div
      role="region"
      aria-label="Bryan Center Mail Line Status"
      tabIndex="-1"
      className={`LineStatus ${isMobile ? "mobile" : ""}`}
    >
      <h2>Bryan Center Mail Line Status</h2>
      <div className="status-box">
          <CircleIcon role="status" aria-label={"Circle is " + inputColor} style={{ color: corrColor }} />
        <p>{est}</p>
      </div>
      <div className="update-l">
        <i> Last Updated: {lastUpdatedColor ? lastUpdatedColor : ""} </i>
      </div>
    </div>
  );
};

export default LineStatus;
