import React, { useState, useEffect, useContext, useMemo } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { format, parseISO } from "date-fns";
import axios from "axios";
import "./Scheduler.css";
// import DropdownAll from "./DropdownAll";
import "./AdminCalendar.css";
// import StudentPreview from "./StudentPreview";
import StudentPreviewContext from "./contexts/StudentPreviewContext";
import TimeslotsContext from "./contexts/TimeslotsContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

function ServerDay(props) {
  const {
    day,
    outsideCurrentMonth,
    timeslots,
    isWeekend,
    datesWithTimeslots,
    ...other
  } = props;
  const [userTimeslots, setUserTimeslots] = useState([]);

  useEffect(() => {
    // Fetch user timeslots once when the component mounts
    fetch(`${process.env.REACT_APP_LOCAL_HOST}/api/user_timeslots`)
      .then((response) => response.json())
      .then((data) => {
        setUserTimeslots(data);
      })
      .catch((error) => {
        console.error("Error fetching user timeslots:", error);
      });
  }, []);

  const formattedDate = useMemo(() => format(day, "yyyy-MM-dd"), [day]);

  const hasTimeslots = useMemo(() => {
    return timeslots.some(
      (item) => item.date === formattedDate && item.count > 0
    );
  }, [timeslots, formattedDate]);

  const userScheduled = useMemo(() => {
    return userTimeslots.some((item) =>
      item.selected_date_time.startsWith(formattedDate)
    );
  }, [userTimeslots, formattedDate]);

  // Conditionally set the color of the date text
  // const dateTextColor = useMemo(() => {
  //   if (isWeekend(day)) {
  //     return "grey";
  //   } else if (datesWithTimeslots.includes(formattedDate)) {
  //     return "white";
  //   } else {
  //     return "black";
  //   }
  // }, [datesWithTimeslots, timeslots, day]);

  const dateColor = useMemo(() => {
    const currentDate = new Date(); // Get the current date
    currentDate.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)

    const hasPassed = day < currentDate;

    if (outsideCurrentMonth) {
      return "#A9A9A9";
    } else if (hasPassed) {
      return "#707070";
    }
    return;
  }, [day, outsideCurrentMonth]);

  const dateBGColor = useMemo(() => {
    const hasPassed = day < new Date();
    if (
      datesWithTimeslots.includes(formattedDate) ||
      (userScheduled && !hasPassed)
    ) {
      return "rgba(161, 183, 13, 0.25)";
    } else {
      return null;
    }
  }, [datesWithTimeslots, timeslots, day]);

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={userScheduled ? "📆" : null}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        style={{
          color: dateColor,
          backgroundColor: dateBGColor,
        }} // Set the color dynamically
      />
    </Badge>
  );
}

export default function Scheduler() {
  const [userTimeslotId, setUserTimeslotId] = useState(null);
  const [jsonData, setJsonData] = useState([]);
  const [scheduledEntries, setScheduledEntries] = useState([]);
  const [userId, setUserId] = useState("");
  // const [isButtonConfirmed, setIsButtonConfirmed] = useState(false);

  const [scheduledUserIds, setScheduledUserIds] = useState([]);
  const [filteredUserDataArray, setFilteredUserDataArray] = useState([]);

  const acTheme = createTheme({
    breakpoints: {
      values: {
        sm: 420,
      },
    },
  });

  const changeCal = useMediaQuery(acTheme.breakpoints.down("sm"));

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
  } = useContext(TimeslotsContext);

  const { preview, setPreview, selectedDate, setSelectedDate } =
    React.useContext(StudentPreviewContext);

  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const fetchUserTimeslotsForDay = () => {
    if (!selectedDate) {
      return;
    }

    const selectedDateFormatted = format(selectedDate, "yyyy-MM-dd");
    fetch(`${process.env.REACT_APP_LOCAL_HOST}/api/user_timeslots`)
      .then((response) => response.json())
      .then((data) => {
        const apiResponse = data;

        const filteredEntries = apiResponse.filter(
          (item) =>
            item.selected_date_time &&
            item.selected_date_time.startsWith(selectedDateFormatted)
        );

        // Save the filtered entries
        setFilteredUserDataArray(
          filteredEntries.map((entry) => ({
            userid: entry.user_id,
            slot: entry.selected_date_time,
            num_packages: entry.num_packages,
            status: entry.status,
            timeslot_id: entry.timeslot_id,
          }))
        );
        // console.log("filtered entries", filteredEntries);

        const userIds = filteredEntries.map((entry) => entry.user_id);
        setScheduledUserIds(userIds);

        // console.log("userids", userIds);

        // Calculate the current users count for each timeslot
        const usersInSlot = {};
        filteredEntries.forEach((entry) => {
          if (usersInSlot[entry.timeslot_id]) {
            usersInSlot[entry.timeslot_id]++;
          } else {
            usersInSlot[entry.timeslot_id] = 1;
          }
        });

        // Update users per timeslot state
        setUsersPerSlot(usersInSlot);
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
  };

  useEffect(() => {
    fetchUserTimeslotsForDay();
  }, [selectedDate]);

  // Get user from timeslot
  const fetchUserName = () => {
    fetch(`${process.env.REACT_APP_LOCAL_HOST}/api/users`)
      .then((response) => response.json())
      .then((data) => {
        const apiResponse = data;

        const userDataArray = apiResponse
          .filter((user) => scheduledUserIds.includes(user.id))
          .map((user) => {
            const filteredUser = filteredUserDataArray.find(
              (filteredUser) => filteredUser.userid === user.id
            );

            return {
              userid: user.id,
              status: filteredUser ? filteredUser.status : null,
              name: user.display_name,
              boxNumber: user.box_no,
              slot: filteredUser ? filteredUser.slot : null,
              num_packages: filteredUser ? filteredUser.num_packages : null, // Include the 'num_packages' property
              timeslotid: filteredUser ? filteredUser.timeslot_id : null,
            };
          });
        setPreview(userDataArray);
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
  };

  useEffect(() => {
    fetchUserName();
  }, [filteredUserDataArray, scheduledUserIds]);

  const [datesWithTimeslots, setDatesWithTimeslots] = useState([]);

  useEffect(() => {
    // Fetch the timeslots data
    fetch(`${process.env.REACT_APP_LOCAL_HOST}/api/timeslots.json`)
      .then((response) => response.json())
      .then((data) => {
        const timeslotJsonData = data;
        setJsonData(timeslotJsonData);

        // console.log("MADE IT HERE");

        // Filter out the dates with available timeslots
        const datesWithSlots = timeslotJsonData
          .filter((item) => item.count > 0)
          .map((item) => format(parseISO(item.date), "yyyy-MM-dd"));

        // console.log("with slots", datesWithSlots);
        setDatesWithTimeslots(datesWithSlots);
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedDate) {
      // alert("MADE IT SELECTED");

      const selectedDateFormatted = format(selectedDate, "yyyy-MM-dd");
      const filteredData = jsonData.filter((item) => {
        if (!item.date) {
          return false;
        }

        const itemDate = format(parseISO(item.date), "yyyy-MM-dd");
        return itemDate === selectedDateFormatted;
      });

      if (filteredData.length > 0) {
        // console.log("Date is available in the database.");
        const timeslots = filteredData.map((item) => ({
          id: item.id,
          slot_start: new Date(item.slot_start),
          slot_end: new Date(item.slot_end),
          count: item.count,
          date: item.date,
          isAvailable: item.count > 0,
          has_passed: item.has_passed,
        }));
        setTimeslots(timeslots);

        const currentTime = new Date();
        const filtered = timeslots.filter((timeslot) => !timeslot.has_passed);
        
        const sortedOptions = filtered
          .sort((a, b) => a.slot_start.getTime() - b.slot_start.getTime())
          .map((timeslot) => ({
            id: timeslot.id,
            value: timeslot.slot_start.toISOString(),
            label: timeslot.slot_start
              .toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })
              .slice(0, -3),
          }));

        setTimeslotOptions(sortedOptions);
      } else {
        console.log("No timeslots available for", selectedDate);
        setTimeslots([]);
        setTimeslotOptions([]);
      }
    }
  }, [selectedDate, jsonData]);

  const handleDateSelect = (date) => {
    if (selectedDate && selectedDate.getTime() === date.getTime()) {
      // If the clicked date is the same as the currently selected date, reset the selected date and timeslots
      setSelectedDate(null);
      setTimeslots([]);
      setTimeslotOptions([]);
    } else {
      setSelectedDate(date);
    }
  };

  const handleDropdownChange = (selectedOption) => {
    setTimeslotModifyOption(selectedOption);
  };

  // CANCEL WHOLE DAY
  // const [resetCounts, setResetCounts] = useState(false);

  useEffect(() => {
    if (resetCounts) {
      const cancelSlotsPromises = timeslots.map((timeslot) =>
        axios.put(
          `${process.env.REACT_APP_LOCAL_HOST}/api/timeslots/${timeslot.id}`,
          {
            count: null,
          }
        )
      );

      Promise.all(cancelSlotsPromises)
        .then((responses) => {
          console.log(
            "Timeslots updated:",
            responses.map((response) => response.data)
          );
          setResetCounts(false);
          // window.location.reload();();
        })
        .catch((error) => {
          console.error("Error updating timeslots:", error);
        });
    }
  }, [resetCounts, timeslots]);

  // POPULATE WHOLE DAY
  // const [setCounts, setSetCounts] = useState(false);

  useEffect(() => {
    if (setCounts) {
      timeslots.forEach((timeslot) => {
        axios
          .put(
            `${process.env.REACT_APP_LOCAL_HOST}/api/timeslots/${timeslot.id}`,
            {
              count: 3,
            }
          )
          .then((response) => {
            console.log("Timeslot updated:", response.data);
          })
          .catch((error) => {
            console.error("Error updating timeslot:", error);
          });
      });
      setSetCounts(false);
      // window.location.reload();();
    }
  }, [setCounts, timeslots]);
  // isSubmitClikced

  // const [isDataConfirmed, setIsDataConfirmed] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const isWeekend = (date) => {
    const day = date.getDay();

    return day === 0 || day === 6;
  };

  return (
    <ThemeProvider theme={acTheme}>
      <div className={`AC ${changeCal ? "smCal" : ""}`}>
        <h2 className="cmp-title">Select a Date</h2>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            views={["month", "day"]}
            showDaysOutsideCurrentMonth
            fixedWeekNumber={6}
            value={selectedDate}
            onChange={handleDateSelect}
            shouldDisableDate={(date, position) => {
              if (position === "end") {
                return false;
              }
              return isWeekend(date);
            }}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                timeslots,
                isWeekend,
                datesWithTimeslots, // Pass the datesWithTimeslots array to ServerDay
              },
            }}
          />
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  )
}
