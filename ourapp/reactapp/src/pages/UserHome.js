import React, { useState, useEffect, useContext } from "react";
import BoxNum from "../components/BoxNum";
import LineStatus from "../components/LineStatus";
import Address from "../components/Address";
import PHub from "../components/PkgHub";
import ScheduleHub from "../components/ScheduleHub";
import "./UserHome.css";
import { useMediaQuery } from "@mui/material";
import Message from "../components/Message";
import { MessageContext } from "../components/contexts/MessageContext";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { is } from "date-fns/locale";
// import {UserContext} from "../App";
import {UserContext} from "../components/contexts/UserContext";
import { LineStatusContext } from "../components/contexts/LineStatusContext";

function UserHome() {
  const {userId, uniqueId, displayName, boxNumber} = React.useContext(UserContext);
  const {inputColor, setInputColor, lastUpdatedColor, setLastUpdatedColor, statusTime, setStatusTime} = useContext(LineStatusContext);
  const { inputMessage, setInputMessage, lastUpdatedMessage, setLastUpdatedMessage } = useContext(MessageContext);

  const [displayString, setDisplayString] = useState("");
  // console.log("unique id userHome: ", uniqueId);
  // console.log("box number user home: ", boxNumber);

// name logic
  useEffect(() => {
    if (displayName) {
      console.log(displayName.split(" ")[0]);
      setDisplayString(displayName.split(" ")[0]);
    }
  }, [displayName]);



  const [userTimeslotId, setUserTimeslotId] = useState("");
  const [scheduledSlot, setScheduledSlot] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmedUserTimeslot, setConfirmedUserTimeslot] = useState("");
  // console.log("displayName: ", displayName);

  const [hasPackages, setHasPackages] = useState(false);
  const[hasFetched, setHasFetched] = useState(false);

  const getPackageStatus = () => {
    return hasPackages;
  };

  const getFetchedStatus = () => {
    return hasFetched;
  }
  

  const handleTimeslotDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_LOCAL_HOST}/api/user_timeslots/${userTimeslotId}`)
      .then((response) => {
        // Handle the successful response
        //console.log("User timeslot deleted successfully");
        setUserTimeslotId(null);
        setConfirmedUserTimeslot("");
        // Perform any other necessary actions after deleting the timeslot
      })
      .catch((error) => {
        // Handle the error
        console.log("Error deleting user timeslot:", error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };
  // Use Effects: First, from the Unique ID, grab the box number
  // Then, from the User ID, grab the UserTimeslot ID
  let slotStored = false;
  let lastResult;

  
  function memoizedFetchUserTimeslotIdFromServer(){
    if(slotStored){
      return lastResult;
    }
    let result = fetchUserTimeslotIdFromServer();
    lastResult = result;

    slotStored=true;
    return result;
  }
  useEffect(() => {
    if (userId && boxNumber) {
      memoizedFetchUserTimeslotIdFromServer();
    }
  }, [userId, userTimeslotId,scheduledSlot]);

 
  const fetchUserTimeslotIdFromServer = () => {
    // Fetch userTimeslot from the server based on the userId
    fetch(`${process.env.REACT_APP_LOCAL_HOST}/api/user_timeslots/find_by_user_id/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const userTimeslot = data;
          // const userTimeslot = data.find((entry) => entry.status === "scheduled").selected_date_time;
        //console.log("user timeslot:", userTimeslot);
        const scheduledUser = userTimeslot.find(
          (userTimeslot) => userTimeslot.status === "scheduled"
        );
        //console.log("sched user:", scheduledUser);
        setUserTimeslotId(scheduledUser.id);
        //console.log("user timeslot id:", userTimeslotId);
  
        let tempSlot = scheduledUser.selected_date_time;
        let scheduledTempSlot = format(parseISO(tempSlot), "EEEE, MMMM d 'at' h:mm a");
        setScheduledSlot(scheduledTempSlot);
        //console.log("sched slot", scheduledSlot);
      })
      .catch((error) => {
        console.error("Error checking user timeslot:", error);
      });
  };

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

  // MOBILE styling
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <div className={`UserHome ${isMobile ? "mobile" : ""}`}>
        <h1 className="page-title">{displayString}'s Package Hub</h1>

        <div className="UH-flex-wrapper">
          <div className={`UH-col1-wrapper ${isMobile ? "mobile" : ""}`}>
            <BoxNum num={boxNumber} />
            <LineStatus
              color={inputColor}
              est={statusTime}
              update={lastUpdatedColor}
            />
            <Message message={inputMessage} time={lastUpdatedMessage} />
            <Address num = {boxNumber} user={uniqueId} displayName = {displayName}/>
          </div>
          <div aria-label="Package Hub"> <PHub setHasPackages={setHasPackages} setHasFetched={setHasFetched} uniqueId = {uniqueId} boxNumber={boxNumber} /></div>
          <div aria-label="Pickup Scheduler"><ScheduleHub scheduledSlot={scheduledSlot} hasPackage={getPackageStatus()} hasFetched={getFetchedStatus()} userId = {userId} userTimeslotId = {userTimeslotId} uniqueId = {uniqueId} handleTimeslotDelete={handleTimeslotDelete} isDeleting = {isDeleting} /></div>
        </div>
      </div>
    </>
  );
}

export default UserHome;
