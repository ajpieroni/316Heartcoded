//contexts
import { UserContext } from "../components/contexts/UserContext";
import { MessageContext } from "../components/contexts/MessageContext";
import { LineStatusContext } from "../components/contexts/LineStatusContext";
//components
import StudentPreview from "../components/StudentPreview";
import TimeslotsTable from "../components/TimeslotsTable";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import LineStatus from "../components/LineStatus";
//TODO: why is csv not called?
import SchedulerCsvButton from "../components/SchedulerCsvButton";
import Message from "../components/Message";

import LineStatusModifier from "../components/LineStatusModifier";
import AdminCalendar from "../components/AdminCalendar";
//style
import "./AdminHub.css";
//react
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import MessagesCsvButton from "../components/MessagesCsvButton";

export default function AdminHub() {
  const ahTheme = createTheme({
    breakpoints: {
      values: {
        xs: 200,
        sm: 700,
        md: 1100,
        lg: 1400,
      },
    },
  });

  const isGFold= useMediaQuery(ahTheme.breakpoints.down("xs"));
  const isMobile = useMediaQuery(ahTheme.breakpoints.between("xs", "sm"));
  const isMidsize = useMediaQuery(ahTheme.breakpoints.between("sm", "md"));
  // alert("Preview" + preview);

  const { displayName } = React.useContext(UserContext);
  // let firstName = displayName.split(" ");
  // Mobile Styling
  const [displayString, setDisplayString] = useState("");

  useEffect(() => {
    if (displayName) {
      setDisplayString(displayName.split(" ")[0]);
    }
  }, [displayName]);

  // MESSAGE LOGIC
  // use usecontext to get inputmessage state and function from message context
  const { inputMessage, setInputMessage } = useContext(MessageContext);
  const{ lastUpdatedMessage, setLastUpdatedMessage } = useContext(MessageContext);
  // track curr state of val
  const [currVal, setCurrVal] = useState("");

  const {lastUpdatedColor, setLastUpdatedColor} = useContext(LineStatusContext);
  const {inputColor, setInputColor} = useContext(LineStatusContext);
  const {statusTime, setStatusTime} = useContext(LineStatusContext);

  // CHANGES
  const changeInput = (event) => {
    setCurrVal(event.target.value);
  };

  const changeOutput = () => {
    // Create the request body
    const requestBody = JSON.stringify({
      admin: displayName,
      message: currVal,
    });
  
    // Make the POST request using fetch
    fetch(`${process.env.REACT_APP_LOCAL_HOST}/api/admin_messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((response) => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Admin message posted successfully");
        // Perform any other necessary actions after posting the message
      })
      .catch((error) => {
        // Handle the error
        console.log("Error posting admin message:", error);
      });
      setInputMessage(currVal);
    // do axios to store input message
    const dateObject = new Date();
    const formattedDate = `${dateObject.toLocaleDateString()}, ${dateObject.toLocaleTimeString()}`;
    setLastUpdatedMessage(formattedDate);
    setCurrVal(""); // Clear the input after updating the message
  };

  return (
    <ThemeProvider theme={ahTheme}>
      <div
        className={`AdminHub ${isGFold ? "lame" : ""}${
          isMobile ? "mobile" : ""
        }${isMidsize ? "mid" : ""}`}
      >
        <h1 className="page-title">Welcome to {displayString}'s Admin Hub</h1>

        <div
          className={`AH-flex-wrapper ${isMidsize ? "mid" : ""}${
            isMobile ? "mobile" : ""
          }`}
        >
          <div className={`AH-col1 ${isMidsize ? "mid" : ""}${isMobile ? "mobile" : ""}`}>
            <div role="region" aria-label="Message Editor" className="message">
              <h2 className="admin-title">Message Editor</h2>
              <div className="inner-msgmod">
                <div className="inner-msg">
                  <div className="input">
                    <input onChange={changeInput} type="text" value={currVal} />
                    <button onClick={changeOutput}>Update Admin Message</button>
                  </div>
                </div>
              </div>
            </div>

            <div
              role="region"
              aria-label="Line Status Modifier"
              className="line-stat"
            >
              <h2 className="admin-title">Line Status Modifier</h2>
              <div className="inner-ls">
                <LineStatusModifier />
              </div>
            </div>

            <div
              role="region"
              aria-label="Status Previews"
              className="previews"
            >
              <LineStatus
                color={inputColor}
                est={statusTime}
                update={lastUpdatedColor}
              />
              <Message message={inputMessage} time={lastUpdatedMessage} />
            </div>
            <div className="msg-dl">
              <h2 className="admin-title">Messages CSV</h2>
              <MessagesCsvButton />
            </div>
          </div>

          <div className={`AH-col2 ${isMidsize ? "mid" : ""}${isMobile ? "mobile" : ""}`}>
            <div
              role="region"
              aria-label="Admin Calendar Viewer and Editor"
              className="admin-cal"
            >
              <AdminCalendar />
            </div>
            <StudentPreview />
          </div>

          <div className={`AH-col3 ${isMidsize ? "mid" : ""}${isMobile ? "mobile" : ""}`}>
            <TimeslotsTable />
            <div className="scd-dl">
              <h2 className="admin-title">Scheduler CSV</h2>
              <SchedulerCsvButton />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
