import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import StudentPreviewContext from "./contexts/StudentPreviewContext";
import "./StudentPreview.css";
import SchedulerCsvButton from "./SchedulerCsvButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import parse from "date-fns/parse";
import PersonOffIcon from "@mui/icons-material/PersonOff";

export default function StudentPreview() {
  const { preview, selectedDate, setPreview, setSelectedDate } =
    React.useContext(StudentPreviewContext);

  // state variables
  const [selectedStatus, setSelectedStatus] = useState({});
  const [clickedUser, setClickedUser] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);

  // cells
  useEffect(() => {
    setSelectedCells([]);
  }, [preview]);

  const handleCellClick = async (user, type) => {
    const oldStatus = user.status;
    const newStatus = oldStatus === type ? "scheduled" : type;

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_LOCAL_HOST}/api/user_timeslots/${user.userid}/update_status_by_timeslot/${user.timeslotid}`,
        { status: newStatus }
      );

      if (response.status === 200) {
        console.log(
          `Status updated to "${newStatus}" for student ${user.userid}`
        );
      } else {
        console.error("Failed to update the status in the database");
      }
    } catch (error) {
      console.error("Error updating the status in the database:", error);
    }

    const updatedPreview = preview.map((previewUser) => {
      if (previewUser.userid === user.userid) {
        return { ...previewUser, status: newStatus };
      }
      return previewUser;
    });

    setPreview(updatedPreview);
  };

  // TIMESLOTS
  // view option: slot, hour, day
  const [viewOption, setViewOption] = useState("Day");
  // reset view option to Day when selected date changes
  useEffect(() => {
    setViewOption("Day");
  }, [selectedDate]);

  // array of timeslots
  const timeSlotsArray = preview.map((user) => {
    return new Date(user.slot).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }).slice(0, -3);
  });
  // array of timeslots put into a set so no duplicates
  const uniqueTimeSlots = [...new Set(timeSlotsArray)];

  // hours
  const [hourDropDownOption, setHourDropDownOption] = useState("");
  const [slotDropDownOption, setSlotDropDownOption] = useState("");

  // hours array
  const timeHoursArray = preview.map((user) => {
    const date = new Date(user.slot);
    const hour = date.getHours();
    const meridiem = hour < 12 ? "AM" : "PM";
    const formattedHour = (hour % 12 || 12).toString();
    const timeWithMinutes =
      (formattedHour < 10 ? "0" + formattedHour : formattedHour) +
      ":00 " +
      meridiem;
    return timeWithMinutes;
  });

  const uniqueTimeHours = [...new Set(timeHoursArray)];

  // handle views
  const handleSlotView = () => {
    setViewOption("Slot");
  };

  const handleHourView = () => {
    // alert("ONE HOUR");
    setViewOption("Hour");
  };
  const handleDayView = () => {
    // alert("ONE Day");
    setViewOption("Day");
  };
  return (
    <>
      <div aria-label="Preview Students for Selected Date" id="preview-student">
        {selectedDate === null ? (
          <div className="no-date-selec">
            <h3>Preview for: </h3>
            <p>No date is selected in calendar</p>
          </div>
        ) : (
          <>
            <h3>
              {viewOption} View
            </h3>
            {preview.length > 0 && (
              <div className="ac-selectors">
                <div className="ac-slot" id = "sp-slot">
                  {/* SLOT BUTTON & VIEW */}
                  {preview.length > 0 && (
                    <button onClick={handleSlotView}>ONE SLOT</button>
                  )}

                  {/* HOUR BUTTON & VIEW */}
                  {preview.length > 0 && (
                    <button onClick={handleHourView}>BY HOUR</button>
                  )}

                  {/* DAY BUTTON & VIEW */}
                  {preview.length > 0 && (
                    <button onClick={handleDayView}>BY DAY</button>
                  )}
                </div>
                {viewOption === "Hour" && (
                  <div className="sp-hs">
                    <label>Select an hour:</label>
                    <select
                      value={hourDropDownOption}
                      onChange={(e) => setHourDropDownOption(e.target.value)}
                    >
                      <option value="">Select an hour</option>
                      {uniqueTimeHours
                        .sort((a, b) => {
                          const timeA = parse(a, "h:mm a", new Date());
                          const timeB = parse(b, "h:mm a", new Date());
                          return timeA - timeB;
                        })
                        .map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {viewOption === "Slot" && (
                  <div className="sp-ts">
                    <label>Select a timeslot:</label>
                    <select
                      value={slotDropDownOption}
                      onChange={(e) => setSlotDropDownOption(e.target.value)}
                    >
                      <option value="">Select a time slot</option>
                      {uniqueTimeSlots
                        .sort((a, b) => {
                          const timeA = parse(a, "h:mm a", new Date());
                          const timeB = parse(b, "h:mm a", new Date());
                          return timeA - timeB;
                        })
                        .map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
                {viewOption === "Day" && <div></div>}
              </div>
            )}

            {preview.length === 0 ? (
              <div className="no-sched">
                <PersonOffIcon id="po-icon" />
                <p>No students scheduled.</p>
              </div>
            ) : (
              <table id="preview-table">
                <thead>
                  <tr>
                    <th>Slot</th>
                    <th>Student</th>
                    <th>Box #</th>
                    <th>Pkgs</th>
                    <th>Status</th>
                    <th className="sp-stat-col">Arrived</th>
                    <th className="sp-stat-col">Missed</th>
                  </tr>
                </thead>
                <tbody>
                  {preview
                    .filter((user) => {
                      if (viewOption === "Day") {
                        return true;
                      }
                      // slot
                      if (slotDropDownOption) {
                        const selectedTime = slotDropDownOption;

                        const userTime = new Date(user.slot).toLocaleTimeString(
                          [],
                          {
                            hour: "numeric",
                            minute: "2-digit",
                          }
                        ).slice(0, -3);
                        

                        return selectedTime === userTime;
                      }
                      // hour
                      if (hourDropDownOption) {
                        const isPM = hourDropDownOption.includes("PM");
                        let selectedHour = hourDropDownOption.split(":")[0];

                        if (isPM) {
                          selectedHour = (
                            parseInt(selectedHour, 10) + 12
                          ).toString();
                        }

                        const userHour = new Date(user.slot)
                          .getHours()
                          .toString()
                          .padStart(2, "0")
                          .trim(); // Trim any leading/trailing whitespaces

                        return selectedHour === userHour;
                      }

                      return true;
                    })
                    .sort((a, b) => {
                      const timeA = new Date(a.slot).getTime();
                      const timeB = new Date(b.slot).getTime();
                      return timeA - timeB;
                    })
                    .map((user, index) => {
                      return (
                        <tr key={index}>
                          <td id="tc-timeslot">
                            {/* {console.log("use slot: ", user.slot)} */}
                            {new Date(user.slot).toLocaleTimeString([], {
                              hour: "numeric",
                              minute: "2-digit",
                            }).slice(0, -3)}
                          </td>
                          <td id="tc-user">{user.name}</td>
                          <td id="tc-boxnum">{user.boxNumber}</td>
                          <td id="tc-numpkg">{user.num_packages}</td>
                          <td id="tc-status">
                            {user.status
                              ? user.status.charAt(0).toUpperCase() +
                                user.status.slice(1)
                              : ""}
                          </td>
                          <td className="status-cell">
                            <CheckCircleIcon
                              role="button"
                              className={`arr-${user.status}`}
                              onClick={() => handleCellClick(user, "arrived")}
                            />
                          </td>
                          <td className="status-cell">
                            <CancelIcon
                              role="button"
                              className={`mis-${user.status}`}
                              onClick={() => handleCellClick(user, "missed")}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </>
  );
}
