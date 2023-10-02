import React from "react";

const StudentPreviewContext = React.createContext();

export const StudentPreviewProvider = ({ children }) => {
  const [preview, setPreview] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(null);

  return (
    <StudentPreviewContext.Provider value={{ preview, setPreview, selectedDate, setSelectedDate }}>
      {children}
    </StudentPreviewContext.Provider>
  );
};

export default StudentPreviewContext;