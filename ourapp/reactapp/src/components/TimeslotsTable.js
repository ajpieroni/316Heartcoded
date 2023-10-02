import StudentPreviewContext from "./contexts/StudentPreviewContext";
import TimeslotsContext from "./contexts/TimeslotsContext";
import format from "date-fns/format";
import { useContext, useState } from "react";
import DropdownAll from "./DropdownAll";
import "./TimeslotsTable.css";
import { useEffect } from "react";
import React from "react";
import Tooltip from "@mui/material/Tooltip";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function TimeslotsTable() {
  const {
    timeslots,
    setTimeslots,
    selectedTimeslotId,
    setSelectedTimeslotId,
    selectedCountOption,
    setSelectedCountOption,
    timeslotModifyOption,
    setTimeslotModifyOption,
    setCounts,
    setSetCounts,
    resetCounts,
    setResetCounts,
    isButtonConfirmed,
    setIsButtonConfirmed,
    handleTimeslotSelect,
    handleSubmit,
    usersPerSlot,
    setUsersPerSlot,
    isSubmitClicked,
    setIsSubmitClicked,
    isDataConfirmed,
    setIsDataConfirmed,
    timeslotOptions,
    setTimeslotOptions,
    countOptions,
    selectedStart,
    setSelectedStart,
    selectedEnd,
    setSelectedEnd,
    setSlotStart,
    setSlotEnd,
  } = useContext(TimeslotsContext);

  const { preview, setPreview, selectedDate, setSelectedDate } =
    React.useContext(StudentPreviewContext);

  useEffect(() => {
    const storedSelectedDate = localStorage.getItem("selectedDate");
    if (storedSelectedDate) {
      setSelectedDate(new Date(storedSelectedDate));
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem("selectedDate", selectedDate.toISOString());
    }
  }, [selectedDate]);

  const handleFormSubmit = () => {
    const tempSelectedDate = selectedDate;
    handleSubmit();

    setSelectedDate(tempSelectedDate);
  };

  // * TOGGLE Timeslot editor view
  const [isTabCollapsed, setIsTabCollapsed] = useState(false);
  const tooltipMessage = isTabCollapsed ? "Display Table" : "Hide Table";

  const handleCollapse = () => {
    if (timeslots.length !== 0) {
      setIsTabCollapsed(!isTabCollapsed);
    }
  };

  // *Setting view of if the timeslot has passed or not, disabling the Timeslot Editor
  const [timeslotView, setTimeslotView] = useState("curr");
  const [lastSlot, setLastSlot] = useState([]);
  useEffect(() => {

    if (selectedDate) {

      let timeslotsSort = timeslots.sort(
        (a, b) => a.slot_start.getTime() - b.slot_start.getTime()
      );

      // check if array is empty before grabbing last one
      if (timeslotsSort.length !== 0) {
        let timeslotLast = timeslotsSort[timeslots.length - 1];
        setLastSlot(timeslotLast);
      }

      if (lastSlot.has_passed) {
        setTimeslotView("passed");
      } else {
        setTimeslotView("curr");
      }
    }
  }, [selectedDate, timeslots, lastSlot]);

  // *TIMESLOT POPULATION

  // State to store the filtered timeslots
  const [filteredTimeslots, setFilteredTimeslots] = useState([]);

  useEffect(() => {
    // Function to update the filtered timeslots
    const updateFilteredTimeslots = () => {
      const currentTime = new Date();
      const filtered = timeslots.filter(
        (timeslot) => new Date(timeslot.slot_start) > currentTime
      );
      setFilteredTimeslots(filtered);
    };

    // Call the update function initially and whenever timeslots change
    updateFilteredTimeslots();

    if (filteredTimeslots.length === 0) {
      setIsTabCollapsed(true);
    }

    // Set up an interval to update the filtered timeslots every 1 minutes
    const interval = setInterval(updateFilteredTimeslots, 1 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [timeslots]);

  const [filteredEditManyTimeslots, setFilteredEditManyTimeslots] = useState(
    []
  );

  useEffect(() => {
    // Function to update the filtered edit many timeslots
    const updateFilteredEditManyTimeslots = () => {
      const currentTime = new Date();
      const filtered = timeslots.filter(
        (timeslot) =>
          timeslot.slot_start !== null &&
          new Date(timeslot.slot_start) > currentTime
      );
      setFilteredEditManyTimeslots(filtered);
    };

    // Call the update function initially and whenever timeslots change
    updateFilteredEditManyTimeslots();

    // Set up an interval to update the filtered edit many timeslots every 1 minutes
    const interval = setInterval(
      updateFilteredEditManyTimeslots,
      1 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [timeslots]);
  return (
    <>
    <h2 className="admin-title">Timeslot Editor</h2>
      <div className="TimeslotsTable">
        {selectedDate === null ? (
          <div className="no-date-selec">
            <h3 className="tt-title">Edit slots on: </h3>
            <p>No date is selected in calendar</p>
          </div>
        ) : timeslotView === "curr" ? (
          <>
            <button className="vis-icon" onClick={handleCollapse}>
              <Tooltip title={tooltipMessage}>
                {isTabCollapsed ? (
                  <VisibilityIcon/>
                ) : (
                  <VisibilityOffIcon/>
                )}
              </Tooltip>
            </button>
            {!isTabCollapsed && (
              <div className="ac-selectors">
                <div className="ac-slot">
                  <button
                    className={`ac-button timeslot-option-button ${
                      timeslotModifyOption === "oneSlot" ? "selected" : ""
                    }`}
                    onClick={() => setTimeslotModifyOption("oneSlot")}
                    disabled={
                      timeslotModifyOption === "allSlots" ||
                      timeslotModifyOption === "editManySlots" ||
                      timeslotModifyOption === "cancelAll" ||
                      setCounts ||
                      resetCounts ||
                      isButtonConfirmed
                    }
                  >
                    EDIT ONE
                  </button>
                  <button
                    className={`ac-button timeslot-option-button ${
                      timeslotModifyOption === "allSlots" ? "selected" : ""
                    }`}
                    onClick={() => setTimeslotModifyOption("allSlots")}
                    disabled={
                      timeslotModifyOption === "oneSlot" ||
                      timeslotModifyOption === "editManySlots" ||
                      timeslotModifyOption === "cancelAll" ||
                      setCounts ||
                      resetCounts ||
                      isButtonConfirmed
                    }
                  >
                    EDIT ALL
                  </button>

                  <button
                    className={`ac-button timeslot-option-button ${
                      timeslotModifyOption === "cancelAll" ? "selected" : ""
                    }`}
                    onClick={() => setTimeslotModifyOption("cancelAll")}
                    disabled={
                      timeslotModifyOption === "oneSlot" ||
                      timeslotModifyOption === "allSlots" ||
                      timeslotModifyOption === "editManySlots" ||
                      setCounts ||
                      resetCounts ||
                      isButtonConfirmed
                    }
                  >
                    CANCEL DAY
                  </button>

                  <button
                    className={`ac-button timeslot-option-button ${
                      timeslotModifyOption === "editManySlots" ? "selected" : ""
                    }`}
                    onClick={() => setTimeslotModifyOption("editManySlots")}
                    disabled={
                      timeslotModifyOption === "oneSlot" ||
                      timeslotModifyOption === "allSlots" ||
                      timeslotModifyOption === "cancelAll" ||
                      setCounts ||
                      resetCounts ||
                      isButtonConfirmed
                    }
                  >
                    EDIT MANY
                  </button>
                </div>

                {/* End of buttons ^^ */}

                {timeslotModifyOption === "oneSlot" && (
                  <div className="ac-s-wrapper">
                    <div className="ac-ts">
                      <label>Select a timeslot:</label>
                      <select
                        value={selectedTimeslotId?.value}
                        onChange={handleTimeslotSelect}
                      >
                        <option value=""> </option>

                        {timeslotOptions.map((option) => (
                          <option key={option.id} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      <div className="ac-count">
                        <label>Select a count:</label>
                        <DropdownAll
                          options={countOptions}
                          value={selectedCountOption}
                          onChange={(selectedOption) =>
                            setSelectedCountOption(selectedOption)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
                {timeslotModifyOption === "allSlots" && (
                  <div className="ac-count">
                    <label>Select a count:</label>
                    <DropdownAll
                      options={countOptions}
                      value={selectedCountOption}
                      onChange={(selectedOption) =>
                        setSelectedCountOption(selectedOption)
                      }
                    />
                  </div>
                )}
              </div>
            )}
            {timeslotModifyOption == "cancelAll" && (
              <p>
                Are you sure you want to cancel <br /> all slots for the
                selected date?
              </p>
            )}

            {timeslotModifyOption === "editManySlots" && (
              <div className="ac-s-wrapper">
                <div className="ac-ts">
                  <label>Select starting timeslot:</label>
                  <div className="dropdown-container">
                    <select
                      value={selectedStart?.value}
                      onChange={setSlotStart}
                    >
                      <option value=""> </option>
                      {filteredEditManyTimeslots.map((timeslot) => (
                        <option
                          key={timeslot.id}
                          value={timeslot.slot_start.toISOString()}
                        >
                          {timeslot.slot_start.toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          }).slice(0, -3)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="ac-ts">
                  <label>Select ending timeslot:</label>
                  <div className="dropdown-container">
                    <select value={selectedEnd?.value} onChange={setSlotEnd}>
                      <option value=""> </option>
                      {filteredEditManyTimeslots.map((timeslot) => (
                        <option
                          key={timeslot.id}
                          value={timeslot.slot_start.toISOString()}
                        >
                          {timeslot.slot_start.toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          }).slice(0, -3)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="ac-count">
                  <label>Count:</label>
                  <DropdownAll
                    options={countOptions}
                    value={selectedCountOption}
                    onChange={(selectedOption) =>
                      setSelectedCountOption(selectedOption)
                    }
                  />
                </div>
              </div>
            )}

            {!isTabCollapsed && timeslotModifyOption != "" && (
              <div className="button-group">
                <button
                  className="submit-button"
                  onClick={handleFormSubmit}
                  disabled={
                    !timeslotModifyOption ||
                    setCounts ||
                    resetCounts ||
                    isButtonConfirmed
                  }
                >
                  Confirm
                </button>
                <button
                  className="cancel-button"
                  onClick={() => {
                    setSetCounts(false);
                    setResetCounts(false);
                    setTimeslotModifyOption("");
                    setIsDataConfirmed(false);
                  }}
                  disabled={!timeslotModifyOption}
                >
                  Cancel
                </button>
              </div>
            )}
            {!isTabCollapsed && timeslots.length > 0 ? (
              <table id="ts-table">
                <thead>
                  <tr>
                    <th>Start Time</th>
                    <th>Remaining Slots</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTimeslots
                    .sort(
                      (a, b) => a.slot_start.getTime() - b.slot_start.getTime()
                    )
                    .map((timeslot) => (
                      <tr key={timeslot.id}>
                        <td>
                          {timeslot.slot_start
                            ? timeslot.slot_start.toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "2-digit",
                              }).slice(0, -3)
                            : null}
                        </td>
                        <td>{timeslot.count}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>
                {timeslots.length === 0 ? (
                  <>
                    <span className="noslot">
                      No timeslots available for{" "}
                      {format(selectedDate, "MMMM dd, yyyy")}.
                    </span>
                  </>
                ) : (
                  <div className="noslot">Timeslot Editor collapsed.</div>
                )}
              </p>
            )}
          </>
        ) : (
          <>
            <h3>Timeslot Editor</h3>
            <p>Slots for past days cannot be edited.</p>
          </>
        )}
      </div>
    </>
  );
}
