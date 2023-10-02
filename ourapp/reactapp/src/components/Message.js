import React, { useContext } from "react";
import "./Message.css";
import { MessageContext } from "./contexts/MessageContext";

const Message = ({ message }) => {
  const { lastUpdatedMessage } = useContext(MessageContext);
  return (
    <div
      role="region"
      aria-label="Mail Center Message"
      tabIndex="-1"
      className="Message"
    >
      <h2>Message from the Mail Center</h2>
      <div className="status-box-m">{message}</div>
      <div className="update">
        <i> Last Updated: {lastUpdatedMessage ? lastUpdatedMessage : ""} </i>
      </div>
    </div>
  );
};

export default Message;
