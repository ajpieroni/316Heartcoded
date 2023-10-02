import React, { useState, useEffect, useRef, useContext } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { format, parseISO } from "date-fns";
// import StudentPreview from "./StudentPreview";
import axios from "axios";
import "./Scheduler.css";
import Package from "./Package";
// import {UserContext} from "../App";
import { UserContext } from "./contexts/UserContext";
import { useMediaQuery } from "@mui/material";
import { paperClasses } from "@mui/material";
import { resolveTimeFormat } from "@mui/x-date-pickers/internals/utils/time-utils";

export default function Scheduler() {
  const { uniqueId, userId, boxNumber, affiliation} = useContext(UserContext);
  // alert(boxNumber);
  const currentDate = new Date();

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);
  const [selectedTimeslotId, setSelectedTimeslotId] = useState(null);
  const [userTimeslotId, setUserTimeslotId] = useState(null);
  // const [userId, setUserId] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [timeslotsVisible, setTimeslotsVisible] = useState(false); // State variable for timeslot visibility
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [checkUserConfirmed, setCheckUserConfirmed] = useState(false);
  const [confirmedUserTimeslot, setConfirmedUserTimeslot] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [isAllSlotsUnavailable, setIsAllSlotsUnavailable] = useState(false);
  const [isSameDay, setIsSameDay] = useState("");
  const [isBefore, setIsBefore] = useState("");

  const [hasFetched, setHasFetched] = useState(false);
  const [ellipsisDots, setEllipsisDots] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisDots((dots) => (dots < 3 ? dots + 1 : 1));
    }, 200);

    return () => clearInterval(interval);
  }, []);
  // storing number of packages and user id
  // const [usersToAdmin, setUsersToAdmin] = useState([]);

  const handleDateSelect = (date) => {
    // console.log("Here is curr date: ", currentDate);
    // console.log("Here is date: ", date);
    if (selectedDate && selectedDate.getTime() === date.getTime()) {
      setSelectedDate(null);
      setTimeslotsVisible(false);
    } else {
      setSelectedDate(date);
      setSelectedTimeslot(null);
      setIsConfirmed(false);
      setIsDeleting(false);
      setTimeslotsVisible(true);
    }
  };

  // Get user information

  const fetchUserTimeslotIdFromServer = () => {
    // Fetch userTimeslot from the server based on the userId
    fetch(
      `${process.env.REACT_APP_LOCAL_HOST}/api/user_timeslots/find_by_user_id/${userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        const userTimeslot = data;
        // console.log("user timeslot:", userTimeslot);
        const scheduledUser = userTimeslot.find(
          (userTimeslot) => userTimeslot.status === "scheduled"
        );
        setUserTimeslotId(scheduledUser.id);
        // console.log("user timeslot id:", userTimeslotId);
      })
      .catch((error) => {
        console.error("Error checking user timeslot:", error);
      });
  };

  useEffect(() => {
    //alert("fetchUserTimeslotIdFromServer");
    if (userId) {
      fetchUserTimeslotIdFromServer();
    }
  }, [userId]);

  useEffect(() => {
    // loads all timeslots
    //alert("Initial all timeslots");
    fetch(
      `${process.env.REACT_APP_LOCAL_HOST}/api/timeslots/condensed_timeslots`
    )
      .then((response) => response.json())
      .then((data) => {
        const timeslotJsonData = data;
        setJsonData(timeslotJsonData);
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
      });
  }, []);

  // all unavailable timeslots

  useEffect(() => {
    //alert("setIsAllSlotsUnavailable");
    const allUnavailable = timeslots.every((slot) => !slot.isAvailable);
    setIsAllSlotsUnavailable(allUnavailable);
  }, [timeslots]);

  useEffect(() => {
    // alert("checks if selected date is available in the db");
    // checks if selected date is available in the db
    if (selectedDate) {
      const selectedDateFormatted = format(selectedDate, "yyyy-MM-dd");
      const filteredData = jsonData.filter((item) => {
        if (!item.has_passed) {
          const itemDate = format(parseISO(item.date), "yyyy-MM-dd");
          return itemDate === selectedDateFormatted;
        }
        return false; // Exclude items with null date
      });
      if (filteredData.length > 0) {
        console.log("Date is available in the database.");
        const timeslots = filteredData.map((item) => ({
          id: item.id,
          slot_start: new Date(item.slot_start),
          slot_end: new Date(item.slot_end),
          count: item.count,
          isAvailable: item.count > 0,
        }));
        setTimeslots(timeslots);
      } else {
        console.log("No timeslots available for the selected date.");
        setTimeslots([]);
        setTimeslotsVisible(false);
      }
    }
  }, [selectedDate, jsonData]);

  const handleConfirmationCancel = () => {
    setActiveButton(null);
    setIsConfirming(false);
    setIsConfirmed(false);
    setIsDeleting(false);
    setSelectedTimeslot(null);
    setSelectedTimeslotId(null);
  };

  const handleConfirmationConfirm = () => {
    // setIsConfirming(false);
    // setTimeslotsVisible(false);
    const user_id = userId;
    const timeslot_id = selectedTimeslotId;
    const status = "scheduled";
    const selected_date_time = selectedTimeslot.toISOString();
    const num_packages = packages?.length;
    console.log("num packages confirmed: ", num_packages);
    // Save the selected date and time to local storage
    //Current user data to send
    const requestData = {
      user_timeslot: {
        user_id,
        timeslot_id,
        status,
        selected_date_time,
        num_packages,
      },
    };
    console.log("requestData: ", requestData);
    //Post request, send scheduled slot to database

    axios
      .post(
        `${process.env.REACT_APP_LOCAL_HOST}/api/user_timeslots`,
        requestData
      )
      .then((response) => {
        const { id, timeslot_id } = response.data;
        setUserTimeslotId(id);
        setSelectedTimeslot(selected_date_time);
        setSelectedTimeslotId(timeslot_id);

        setIsConfirming(false);
        setIsConfirmed(true);
        hasUserScheduled();
      });

    axios
      .get(`${process.env.REACT_APP_LOCAL_HOST}/api/users`)
      .then((response) => {
        console.log("here is new: ", response);
        const users = response.data;
        const user = users.find((user) => user.id === userId);
        const user_email = user.email;
        console.log("bro", user_email);
      })

      .catch((error) => {
        // Handle the error
        console.error("Error saving user timeslot:", error);
      });

    axios
      .get(
        `${process.env.REACT_APP_LOCAL_HOST}/api/confirmation_email/${uniqueId}/${timeslot_id}`
      )
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error(
          "Error sending email, be sure users table is populated with email:",
          error
        );
      });
  };

  const handleTimeslotCancel = () => {
    setSelectedTimeslot(null);
    setIsConfirming(false);
    setIsConfirmed(false);
    setActiveButton(null);
    setIsDeleting(true);
    setTimeslotsVisible(true);
    axios
      .delete(
        `${process.env.REACT_APP_LOCAL_HOST}/api/user_timeslots/${userTimeslotId}`
      )
      .then((response) => {
        // Handle the successful response
        axios
          .get(
            `${process.env.REACT_APP_LOCAL_HOST}/api/cancellation_email/${uniqueId}/${response.data.timeslot_id}`
          )
          .then(() => {
            console.log("Email sent successfully");
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
        setSelectedDate(null);
        //setUserTimeslotId(null);
        setSelectedTimeslot(null);
        setSelectedTimeslotId(null);
        setIsConfirmed(false); // Disable buttons
        setConfirmedUserTimeslot("");
        setCheckUserConfirmed(false);
      })
      .catch((error) => {
        // Handle the error
        console.error("Error canceling user timeslot:", error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const hasUserScheduled = () => {
    // When a person reloads a page, checks if they have already scheduled
    fetch(
      `${process.env.REACT_APP_LOCAL_HOST}/api/user_timeslots/find_by_user_id/${userId}`
    )
      .then((response) => {
        if (response.ok) {
          setCheckUserConfirmed(true);
          return response.json();
        } else {
          setCheckUserConfirmed(false);

          throw new Error("User timeslot not found");
        }
      })

      .then((data) => {
        const myTimeslot = data.find(
          (entry) => entry.status === "scheduled"
        ).selected_date_time;

        console.log("my timeslot:", myTimeslot);

        setConfirmedUserTimeslot(
          format(parseISO(myTimeslot), "EEEE, MMMM d 'at' h:mm a")
        );
      })

      .catch((error) => {
        setCheckUserConfirmed(false);

        console.error("Error checking user timeslot:", error);
      });
  };

  useEffect(() => {
    //alert("Check that user has scheduled throughout their session");

    // Check that user has scheduled throughout their session

    hasUserScheduled();
  }, [userId]);

  const isMobile = useMediaQuery("(max-width: 915px)");

  const sortingOptions = [
    { value: "all", label: "All Timeslots" },

    { value: "hour", label: "Sort by Hour" },
  ];

  const [selectedSortingOption, setSelectedSortingOption] = useState("all");

  const [selectedHour, setSelectedHour] = useState(null);

  const confirmRef = useRef(null);

  useEffect(() => {
    //alert("isConfirming");

    if (isConfirming && confirmRef.current) {
      confirmRef.current.scrollIntoView({
        behavior: "smooth",

        block: "start",
      });
    }
  }, [isConfirming]);
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // !MEMOIZATION
  let packagesStored = false;
  let lastResult;

  function memoizedFetchPackages() {
    if (packagesStored) {
      return lastResult;
    }
    let result = fetchPackages();
    lastResult = result;

    packagesStored = true;
    return result;
  }

  const fetchPackages = async () => {
    // alert("Unique ID: ", uniqueId);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_HOST}/api/fetch_asset_ids`,
        {
          unique_id: uniqueId,
          box_number: boxNumber,
          // unique_id: 1236441,
          // box_number: 99490,
        }
      );
      // console.log("Here is repsonse:  !!!!!!!!!", response);
      // console.log("Response from server:", response.data);
      // console.log("Full response: ", response );
      // console.log("Response status: ", response.status)
      // console.log("Resp error, "+ response.data.error + "or: "+ response.error)
      console.log("New and improved response:  ", response);
      if (response.data.error !== "No asset data found") {
        setPackages(response.data.assetIds);
        setHasFetched(true);
      }
      if (response.data.error === "No asset data found") {
        // setPackages([]);
        setHasFetched(true);
        setIsLoading(false);
      }
      if (response.data.length === 0) {
        setHasFetched(true);
        setIsLoading(false);
      }

      // alert("SCLogic Data: ", response.data.assetIds);

      // console.log("sclogic data: ", packages);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    // alert("fetchPackage");
    // console.log("package data:", packages);
    if (uniqueId && boxNumber) {
      memoizedFetchPackages();
    }
  }, [uniqueId, boxNumber]);

  const isWeekend = (date) => {
    const day = date.getDay();

    return day === 0 || day === 6;
  };

  useEffect(() => {
    console.log("package data:", packages);
  }, [packages]);

  return (
    <div className={`Scheduler ${isMobile ? "mobile" : ""}`}>
      {/* <h1>HERE IS SCHEDULER</h1> */}

      <div role="region" aria-label="Packages" className="packages">
        <h2>Packages to Pick Up</h2>

        <div className="inner-pickup">
          {/* {console.log("isLoading: ", isLoading)}
          {console.log("hasFetched: ", hasFetched)} */}

          {isLoading ? (
            <div className="loading">Loading {".".repeat(ellipsisDots)}</div>
          ) : packages?.length > 0 ? (
            packages.map((assetId, index) => (
              <Package key={index} pkgNum={index + 1} trackingNum={assetId} />
            ))
          ) : hasFetched && packages.length === 0 ? (
            <p>You currently have no packages.</p>
          ) : (
            <div className="loading">`Loading${".".repeat(ellipsisDots)}`</div>
          )}
        </div>
      </div>

      {!isLoading && packages?.length > 0 && (
        <div className="picker" role="region" aria-label="Pickup Scheduler">
          <h2>Select a Date and Timeslot</h2>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar
              // defaultValue={currentDate}
              date={selectedDate}
              onChange={handleDateSelect}
              minDate={new Date()}
              shouldDisableDate={(date, position) => {
                if (position === "end") {
                  return false;
                }
                return isWeekend(date);
              }}
              renderDay={(day) => {
                const timeslot = timeslots.find((slot) =>
                  isSameDay(slot.slot_start, day)
                );

                const isSelected =
                  selectedTimeslot && selectedTimeslot.id === timeslot?.id;

                const isDisabled = timeslot?.count === 0;

                const isPastDate = isBefore(day, new Date(), {
                  includeDay: true,
                });

                const isUserTimeslot = userTimeslotId === timeslot?.id;

                return (
                  <div>
                    <button
                      key={day.toDateString()}
                      onClick={() => {
                        if (isPastDate || isDisabled) return;

                        if (isSelected) {
                          setSelectedTimeslot(null);

                          setIsConfirmed(false);
                        } else {
                          setSelectedTimeslot(timeslot);

                          setIsConfirmed(isUserTimeslot);
                        }
                      }}
                      className={isSelected ? "active" : ""}
                      disabled={isPastDate || isDisabled}
                    >
                      {format(day, "d")}
                    </button>
                  </div>
                );
              }}
            />
          </LocalizationProvider>

          {/* Timeslots */}

          {!checkUserConfirmed && selectedDate && (
            <>
              <h2 id="timeslot-h2">
                Timeslots for {format(selectedDate, "MMMM dd, yyyy")}:
              </h2>

              {timeslots.length === 0 ? (
                <p>
                  No timeslots available for{" "}
                  {format(selectedDate, "MMMM dd, yyyy")}.
                </p>
              ) : (
                <>
                  <div className="dropdowns">
                    {/* Select dropdown for sorting */}

                    <div className="dd-sort">
                      <label htmlFor="sortingOption">Sort by</label>

                      <select
                        id="sortingOption"
                        value={selectedSortingOption}
                        onChange={(e) => {
                          setSelectedSortingOption(e.target.value);
                          setSelectedHour(null); // Reset selected hour when changing sorting option
                        }}
                      >
                        {sortingOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Select dropdown for hour */}

                    <div className="dd-hour-wrapper">
                      {selectedSortingOption === "hour" ? (
                        <div className="dd-hour">
                          <label htmlFor="hour">Select Hour</label>

                          <select
                            id="hour"
                            value={selectedHour}
                            onChange={(e) => setSelectedHour(e.target.value)}
                          >
                            <option value="">Select an hour</option>

                            {Array.from(
                              new Set(
                                timeslots

                                  .filter((timeslot) => timeslot.isAvailable)

                                  .sort(
                                    (a, b) =>
                                      a.slot_start.getTime() -
                                      b.slot_start.getTime()
                                  )

                                  .map((timeslot) => {
                                    const startHour =
                                      timeslot.slot_start.getHours();

                                    return startHour;
                                  })
                              )
                            ).map((hour) => (
                              <option key={hour} value={hour}>
                                {hour === 0
                                  ? "12 AM"
                                  : hour === 12
                                  ? "12 PM"
                                  : hour < 12
                                  ? `${hour} AM`
                                  : `${hour - 12} PM`}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="dd-hour-placeholder"></div>
                      )}
                    </div>

                    {selectedSortingOption === "all" && (
                      <ul>
                        {timeslots

                          .filter((timeslot) => timeslot.isAvailable)

                          .sort(
                            (a, b) =>
                              a.slot_start.getTime() - b.slot_start.getTime()
                          )

                          .map((timeslot) => (
                            <button
                              key={timeslot.id}
                              onClick={() => {
                                setSelectedTimeslot(timeslot.slot_start);

                                setSelectedTimeslotId(timeslot.id);

                                setIsConfirming(true);

                                if (activeButton === timeslot.id) {
                                  setActiveButton(null); // Remove active styling if the same button is clicked again
                                } else {
                                  setActiveButton(timeslot.id); // Set the active button
                                }
                              }}
                              className={
                                activeButton === timeslot.id ? "active" : ""
                              }
                              disabled={isConfirmed}
                            >
                              {timeslot.slot_start.toLocaleTimeString([], {
                                hour: "numeric",

                                minute: "2-digit",
                              }).slice(0, -3)}
                            </button>
                          ))}
                      </ul>
                    )}
                  </div>

                  {selectedHour && timeslotsVisible && (
                    <ul>
                      {timeslots

                        .filter((timeslot) => {
                          if (
                            selectedSortingOption === "hour" &&
                            selectedHour !== ""
                          ) {
                            const startHour = timeslot.slot_start.getHours();

                            return (
                              timeslot.isAvailable &&
                              startHour === Number(selectedHour)
                            );
                          }

                          return timeslot.isAvailable;
                        })

                        .sort(
                          (a, b) =>
                            a.slot_start.getTime() - b.slot_start.getTime()
                        )

                        .map((timeslot) => (
                          <button
                            key={timeslot.id}
                            onClick={() => {
                              setSelectedTimeslot(timeslot.slot_start);

                              setSelectedTimeslotId(timeslot.id);

                              setIsConfirming(true);

                              if (activeButton === timeslot.id) {
                                setActiveButton(null); // Remove active styling if the same button is clicked again
                              } else {
                                setActiveButton(timeslot.id); // Set the active button
                              }
                            }}
                            className={
                              activeButton === timeslot.id ? "active" : ""
                            }
                            disabled={isConfirmed}
                          >
                            {timeslot.slot_start.toLocaleTimeString([], {
                              hour: "numeric",

                              minute: "2-digit",
                            }).slice(0, -3)}
                          </button>
                        ))}
                    </ul>
                  )}
                </>
              )}
            </>
          )}

          {/* Confirmation */}

          {isConfirming && timeslots.length > 0 && (
            <div className="confirm">
              <p>
                Are you sure you want to save the selected date and time? You'll
                receive a confirmation email shortly.
              </p>
              <div className="confirmation-buttons">
                <button
                  aria-label="Cancel this selection"
                  className="cancel-button"
                  onClick={handleConfirmationCancel}
                >
                  Cancel
                </button>

                <button
                  aria-label="Confirm this selection"
                  className="confirm-button"
                  onClick={handleConfirmationConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {checkUserConfirmed && (
            // If the user has already confirmed, display cancel button

            <div className="sched-msg">
              {/* {console.log("CUT", confirmedUserTimeslot)} */}
              <p>
                Scheduled package pickup date and time: <br />{" "}
                <span id="sched-ts">{confirmedUserTimeslot}</span>
                {/* {console.log("confirmed timeslot 2:", confirmedUserTimeslot)} */}
              </p>
              <button
                className={`button cancel-button`}
                onClick={() => {
                  setIsDeleting(true);
                }}
              >
                Cancel This Timeslot
              </button>

              {isDeleting && (
                <div className="delete">
                  <div aria-label="Confirm message">
                    <p>
                      Are you sure you want to <span id="udl">delete</span> your
                      timeslot?
                    </p>
                  </div>

                  <div className="deletion-buttons">
                    <button
                      role="button"
                      className="yes-delete"
                      onClick={handleTimeslotCancel}
                    >
                      <span aria-hidden="false">Yes</span>

                      <span className="sr-only">Delete this timeslot</span>
                    </button>

                    <button
                      role="button"
                      className="no-keep"
                      onClick={() => {
                        setIsDeleting(false);
                      }}
                    >
                      <span aria-hidden="false">No</span>

                      <span className="sr-only">Keep this timeslot</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
