import React from "react";
import { useState } from "react";
import "../TimeslotsTable.css";
import axios from "axios";
import { endOfWeekWithOptions } from "date-fns/fp";
import { useLocation } from "react-router-dom";

const TimeslotsContext = React.createContext();

export const TimeslotsProvider = ({ children }) => {
  // init
  const [timeslots, setTimeslots] = useState([]);
  const [selectedTimeslotId, setSelectedTimeslotId] = useState("");
  const [selectedCountOption, setSelectedCountOption] = useState("");
  const [timeslotModifyOption, setTimeslotModifyOption] = useState("");
  const [setCounts, setSetCounts] = useState(false);
  const [resetCounts, setResetCounts] = useState(false);
  const [isButtonConfirmed, setIsButtonConfirmed] = useState(false);
  const [usersPerSlot, setUsersPerSlot] = useState({});
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isDataConfirmed, setIsDataConfirmed] = useState(false);
  const [timeslotOptions, setTimeslotOptions] = useState([]);
  // *TODO: Define selectedStart
  const [selectedStart, setSelectedStart] = useState("");
  // *TODO: Define selectedEnd
  const [selectedEnd, setSelectedEnd] = useState("");

  // location = useLocation;
  const location = useLocation();

  // functs
  const handleTimeslotSelect = (event) => {
    const selectedId = event.target.value;
    const selectedOption = timeslotOptions.find(
      (option) => option.value === selectedId
    );
    // console.log("selected option: ", selectedOption);
    setSelectedTimeslotId(selectedOption);
  };

  // *TODO: Handle select start:
  const setSlotStart = (event) => {
    let tempStart = event.target.value;
    const selectedStart = timeslotOptions.find(
      (option) => option.value === tempStart
    );
    // console.log("Selected Start: ", selectedStart);
    setSelectedStart(selectedStart);
  };
  // for handle start:
  // let tempStart = event.target.value;

  // *TODO: Handle select end: setSlotEnd(selectedEnd)

  const setSlotEnd = (event) => {
    let tempEnd = event.target.value;
    const selectedEnd = timeslotOptions.find(
      (option) => option.value === tempEnd
    );
    // console.log("Selected End: ", selectedEnd);
    setSelectedEnd(selectedEnd);
  };

  const handleSubmit = async () => {
    if (timeslotModifyOption) {
      if (timeslotModifyOption === "oneSlot") {
        const selectedTimeslot = timeslots.find(
          (timeslot) => timeslot.id === selectedTimeslotId.id
        );

        if (selectedTimeslot.has_passed === true) {
          window.alert("Timeslot has already passed.");
        } else {
         
          if (selectedCountOption < usersPerSlot[selectedTimeslotId.id]) {
            window.alert(
              `The timeslot was decreased to ${selectedCountOption}. As a note, there are already ${
                usersPerSlot[selectedTimeslotId.id]
              } scheduled to pick up in this timeslot.`
            );
          }
          fetch(
            `${process.env.REACT_APP_LOCAL_HOST}/api/timeslots/${selectedTimeslotId.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                count: selectedCountOption,
              }),
            }
          )
            .then((response) => {
              if (response.ok) {
                console.log("Timeslot updated:", response.data);

                console.log("Reloading...");

                console.log("Waiting 2 seconds before reloading...");
                // Update the local state or perform any additional actions as needed

                // Wait for 2 seconds (2000 milliseconds) before reloading the page
                setTimeout(() => {
                  console.log("Reloading...");
                  console.log("Waiting 2 seconds before reloading...");
                  // Update the local state or perform any additional actions as needed

                  // Wait for 2 seconds (2000 milliseconds) before reloading the page
                  setTimeout(() => {
                    console.log("Reloading...");
                    window.location.reload();
                  }, 1000);
                }, 1000);
                // Update the local state or perform any additional actions as needed
              } else {
                throw new Error("Error updating timeslot");
              }
            })
            .catch((error) => {
              console.error("Error updating timeslot:", error);
              console.log("timeslot id:", selectedTimeslotId.id);
            });
        }
      } else if (timeslotModifyOption === "allSlots") {
        const updateAll = [];
        timeslots.forEach((timeslot) => {
          if (timeslot.has_passed !== true) {
            const minCount = usersPerSlot[timeslot.id];
            if (selectedCountOption < minCount) {
              window.alert(
                `The timeslots were decreased to ${selectedCountOption}. As a note, some users may already be scheduled to pick up in certain timeslots.`
              );
            }
            const updateOne = fetch(
              `${process.env.REACT_APP_LOCAL_HOST}/api/timeslots/${timeslot.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  count: selectedCountOption,
                }),
              }
            )
              .then((response) => {
                if (response.ok) {
                  console.log("Timeslot updated:", response.data);
                  // Update the local state or perform any additional actions as needed
                } else {
                  throw new Error("Error updating timeslot");
                }
              })
              .catch((error) => {
                console.error("Error updating timeslot:", error);
              });
            updateAll.push(updateOne);
          }
        });
        // reload page after full array
        try {
          await Promise.all(updateAll);
          console.log("All timeslots updated successfully.");
          // All fetch requests completed successfully, trigger page reload
          console.log("Waiting 2 seconds before reloading...");
          // Update the local state or perform any additional actions as needed

          // Wait for 2 seconds (2000 milliseconds) before reloading the page
          setTimeout(() => {
            console.log("Reloading...");
            window.location.reload();
          }, 1000);
        } catch (error) {
          console.error("Error updating timeslots:", error);
          // Handle the error if any of the fetch requests fail
        }
      } else if (timeslotModifyOption === "cancelAll") {
        const updateAll = [];
        timeslots.forEach((timeslot) => {
          if (timeslot.has_passed !== true) {
            const minCount = usersPerSlot[timeslot.id];
            if (selectedCountOption < minCount) {
              window.alert(
                `The timeslots were decreased to 0. As a note, some users may already be scheduled to pick up in certain timeslots.`
              );
            }
            const updateOne = fetch(
              `${process.env.REACT_APP_LOCAL_HOST}/api/timeslots/${timeslot.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  count: selectedCountOption,
                }),
              }
            )
              .then((response) => {
                if (response.ok) {
                  console.log("Timeslot updated:", response.data);
                  // Update the local state or perform any additional actions as needed
                } else {
                  throw new Error("Error updating timeslot");
                }
              })
              .catch((error) => {
                console.error("Error updating timeslot:", error);
              });
            updateAll.push(updateOne);
          }
        });

        try {
          await Promise.all(updateAll);
          console.log("All timeslots updated successfully.");
          // All fetch requests completed successfully, trigger page reload
          console.log("Waiting 2 seconds before reloading...");
          // Update the local state or perform any additional actions as needed

          // Wait for 2 seconds (2000 milliseconds) before reloading the page
          setTimeout(() => {
            console.log("Reloading...");
            window.location.reload();
          }, 1000);
        } catch (error) {
          console.error("Error updating timeslots:", error);
          // Handle the error if any of the fetch requests fail
        }
      } else if (timeslotModifyOption === "editManySlots") {
        console.log("Submitted Edit Many");
        const updateAll = [];

        const selectedStartTimeslot = timeslots.find(
          (timeslot) => timeslot.id === selectedStart?.id
        );
        const selectedEndTimeslot = timeslots.find(
          (timeslot) => timeslot.id === selectedEnd?.id
        );

        //console.log("selected 219: ", selectedEndTimeslot);
        if (
          !selectedStartTimeslot ||
          !selectedEndTimeslot ||
          !selectedStartTimeslot.id ||
          !selectedEndTimeslot.id
        ) {
          alert("You have not selected a start or end slot. Please re-select after the page reloads.");
          // Reset the selected timeslots to null or empty string
          setSelectedStart(null);
          setSelectedEnd(null);
          return;
        }

        if (selectedStartTimeslot.id > selectedEndTimeslot.id) {
          alert(
            "Your end slot is earlier than your start slot. Please re-select after the page reloads."
          );
        }

        //makes sure that start time has not passed

        if (selectedStartTimeslot.has_passed) {
          console.log("haspassed:", selectedStartTimeslot.has_passed);
          window.alert("Timeslot has already passed.");
        }

        timeslots.forEach((timeslot) => {
          // console.log("here is count", selectedCountOption);
          // console.log("hits for each");
          //Probably unnecessary, checks again if individual timeslot from timeslots table has passed
          if (timeslot.has_passed !== true) {
            // console.log("hits not passed");
            const minCount = usersPerSlot[timeslot.id];

            //Alerts if trying to lower timeslot count where students have already scheduled

            if (
              timeslot.id >= selectedStartTimeslot.id &&
              timeslot.id <= selectedEndTimeslot.id
            ) {
              // console.log("Correct timeslot: ", timeslot);
              //changes value in database
              const updateOne = fetch(
                `${process.env.REACT_APP_LOCAL_HOST}/api/timeslots/${timeslot.id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    count: selectedCountOption,
                  }),
                }
              )
                .then((response) => {
                  if (response.ok) {
                    // console.log("Timeslot updated:", response.data);
                    // console.log("HIT FETCH");
                    // Update the local state or perform any additional actions as needed
                  } else {
                    throw new Error("Error updating timeslot");
                  }
                })
                .catch((error) => {
                  console.error("Error updating timeslot:", error);
                });
              updateAll.push(updateOne);
              console.log("Waiting 2 seconds before reloading...");
              // Update the local state or perform any additional actions as needed

              // Wait for 2 seconds (2000 milliseconds) before reloading the page
              setTimeout(() => {
                console.log("Reloading...");
                window.location.reload();
              }, 1000);
              console.log("here is update 1:", updateOne);
            }
          }
        });
        try {
          await Promise.all(updateAll);
          console.log("Waiting 2 seconds before reloading...");
       
          setTimeout(() => {
            console.log("Reloading...");
            window.location.reload();
          }, 1000);
          // All fetch requests completed successfully, trigger page reload
        } catch (error) {
          console.error("Error updating timeslots:", error);

        }
      }
    }

    setIsSubmitClicked(true);
  };

  const countOptions = Array.from({ length: 11 }, (_, index) => ({
    value: index.toString(),
    label: index.toString(),
  }));
  return (
    <TimeslotsContext.Provider
      value={{
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
      }}
    >
      {children}
    </TimeslotsContext.Provider>
  );
};

export default TimeslotsContext;
