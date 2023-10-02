import Papa from "papaparse";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "./CsvButton.css";

const SchedulerCsvButton = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleExportClick = () => {
    fetch(
      `${process.env.REACT_APP_LOCAL_HOST}/api/user_timeslots?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Filter data based on selected date range
        const filteredData = data.filter((item) => {
          const selectedDateTime = new Date(item.selected_date_time);

          return (
            selectedDateTime >= new Date(startDate) &&
            selectedDateTime <= new Date(endDate.getTime() + 86400000) // Adding 86400000 milliseconds (1 day) to the endDate
            );
        });

        if (filteredData.length === 0) {
          const csvData = Papa.unparse([{ NoData: "No Data" }]);
          exportData(csvData, getFileName(), "text/csv;charset=utf-8;");
        } else {
          // Filter out unwanted attributes
          const filteredAttributesData = filteredData.map((item) => {
            const { id, user_id, timeslot_id, ...filteredAttributes } = item;
            return filteredAttributes;
          });

          const csvData = Papa.unparse(filteredAttributesData);
          exportData(csvData, getFileName(), "text/csv;charset=utf-8;");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const exportData = (data, fileName, type) => {
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getFileName = () => {
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    const formattedEndDate = endDate.toISOString().slice(0, 10);
    return `scheduled_${formattedStartDate}_to_${formattedEndDate}.csv`;
  };

  return (
    <div
      className="scd-csv"
      role="region"
      aria-label="Download CSV for Select Range"
    >
      <div className="date-selec">
        <div className="start-selec">
          <label>Start:</label>
          <input
            type="date"
            value={startDate.toISOString().slice(0, 10)}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </div>
        <div className="end-selec">
          <label>End:</label>
          <input
            type="date"
            value={endDate.toISOString().slice(0, 10)}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        </div>
      </div>
      <IconButton
        role="button"
        className="dl-icon"
        aria-label="Export to CSV"
        variant="contained"
        color="primary"
        sx={{ height: 60 }}
        onClick={handleExportClick}
      >
        <label aria-hidden="true">Download</label>
        <CloudDownloadIcon aria-hidden="true"/>
      </IconButton>
    </div>
  );
};

export default SchedulerCsvButton;
