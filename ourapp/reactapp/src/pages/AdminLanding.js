//contexts
import {UserContext} from "../components/contexts/UserContext";
import { MessageContext } from "../components/contexts/MessageContext";
import { LineStatusContext } from "../components/contexts/LineStatusContext";
//components
import Message from "../components/Message";
import LineStatus from "../components/LineStatus";
import Viewer from "../components/HubViewer";
//style
import "./Landing.css";
//react
import { useMediaQuery } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function AdminLanding() {
  //color update logic
  const {inputColor, setInputColor, lastUpdatedColor, setLastUpdatedColor, statusTime, setStatusTime} = React.useContext(LineStatusContext);
  const {displayName} = React.useContext(UserContext);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    return formattedDate;
  }

  //Message Logic
  const { inputMessage, lastUpdatedMessage } = useContext(MessageContext);
  //message Update time logic
  //mobile hooks
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  const navigateToAdminHub = () => {
    navigate("/AdminHub", { state: { displayName } });
  };

  return (
    <>
      <div className="Onboard">
        <div className={`content-wrapper ${isMobile ? "mobile" : ""}`}>
          <div className={`mail-status ${isMobile ? "mobile" : ""}`}>
            <LineStatus
              color={inputColor}
              est={statusTime}
              update={lastUpdatedColor}
            />
            <Message message={inputMessage} time={lastUpdatedMessage} />
          </div>

          <Viewer prompt="View Your Admin Hub" fxn={navigateToAdminHub} />
          <div id="space-holder"></div>
        </div>
      </div>
    </>
  );
}
