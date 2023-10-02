import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ScheduleHub.css";
import { set } from "date-fns";
// import {UserContext} from "../App";
import { UserContext } from "./contexts/UserContext";
import { useMediaQuery } from "@mui/material";

export default function ScheduleHub({
  scheduledSlot,
  userTimeslotId,
  handleTimeslotDelete,
  hasPackage,
  hasFetched,
}) {
  const { userId, uniqueId } = React.useContext(UserContext);
  const navigate = useNavigate();
  const navigateToPickup = () => {
    navigate("/UserScheduler");
  };

  const [ellipsisDots, setEllipsisDots] = useState(1);
  const [isPackageAvailable, setIsPackageAvailable] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisDots((dots) => (dots < 3 ? dots + 1 : 1));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmedUserTimeslot, setConfirmedUserTimeslot] =
    useState(scheduledSlot);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsPackageAvailable(hasPackage);
  //   setIsLoading(!hasPackage);
  //   if (!hasPackage){
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 400);
  //   }
  // }, [hasPackage]);


  return (
    <div className={`Schedule ${isMobile ? "mobile" : ""}`}>
      <h2>Pickup Scheduler</h2>
      <div className="inner-schedule">
        {!hasFetched ? (
          <div className="loading">Loading schedule{".".repeat(ellipsisDots)}</div>
        ) : (
          <>
            {hasPackage && !userTimeslotId ? (
              <div>
                <button onClick={navigateToPickup}>+ New Pickup</button>
                <div className="no-scheduled-pickup">
                  No upcoming pickups scheduled.
                </div>
                <div className="disclaimer">
                  We kindly request that when scheduling a pickup for your
                  packages, please refrain from asking any questions regarding
                  mail center operations during your pickup.
                </div>
              </div>
            ) : userTimeslotId ? (
              <>
                <div className="scheduled-pickup">
                  <p>
                    Pickup Scheduled on <br />
                    <span id="sched-ts">{scheduledSlot}</span>
                  </p>
                  <div className="sched-ops">
                    <button
                      onClick={navigateToPickup}
                      className="resched-button"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => {
                        setIsDeleting(true);
                      }}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                  {isDeleting && (
                    <div className="delete">
                      <p>
                        Are you sure you want to <span id="udl">delete</span>{" "}
                        your timeslot?
                      </p>
                      <div className="deletion-buttons">
                        <button
                          className="yes-delete"
                          onClick={handleTimeslotDelete}
                        >
                          Yes
                        </button>
                        <button
                          className="no-keep"
                          onClick={() => {
                            setIsDeleting(false);
                          }}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="terms">
                  By scheduling a package, you agree to the following
                  terms: <br />
                  - You will arrive during your scheduled pickup slot <br />
                  - You will take all packages available for pickup
                  when you arrive at the Mail Center <br />
                  - You will refrain from asking questions about available packages, keys, etc.
                  This can be done in the non-scheduled line <br />
                </div>
              </>
            ) : (
              <div className="nothing-msg">
                You currently have no packages to schedule.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
