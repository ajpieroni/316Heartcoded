import React, { useState, useEffect, useRef, createContext } from "react";
// import { MessageContext } from "./components/MessageContext";
import { MessageContext } from "./components/contexts/MessageContext";
import { LineStatusContext } from "./components/contexts/LineStatusContext";
import { UserProvider } from "./components/contexts/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLanding from "./pages/UserLanding";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import UserHome from "./pages/UserHome";
import UserScheduler from "./pages/UserScheduler";
import Header from "./components/Header";
import AdminLanding from "./pages/AdminLanding";
import AdminHub from "./pages/AdminHub";
import ContactUs from "./pages/ContactUs";
import "./App.css";
import Footer from "./components/Footer";
import axios from "axios";
import { StudentPreviewProvider } from "./components/contexts/StudentPreviewContext";
import { TimeslotsProvider } from "./components/contexts/TimeslotsContext";

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [lastUpdatedMessage, setLastUpdatedMessage] = useState("");
  const [inputColor, setInputColor] = useState("");
  const [lastUpdatedColor, setLastUpdatedColor] = useState("");
  const [statusTime, setStatusTime] = useState("");

  const fetchLatestMessage = () => {
    fetch(`${process.env.REACT_APP_LOCAL_HOST}/api/admin_messages`)
      .then((response) => response.json())
      .then((data) => {
        const latestIndex = data.length - 1;
        const latestMessage = data[latestIndex].message;
        setInputMessage(latestMessage);
        const updatedAt = data[latestIndex].updated_at;
        const dateObject = new Date(updatedAt);
        const formattedDate = `${dateObject.toLocaleDateString()}, ${dateObject.toLocaleTimeString()}`;
        setLastUpdatedMessage(formattedDate);
      })
      .catch((error) => {
        console.log("Error fetching the latest message:", error);
      });
  };

  useEffect(() => {
    fetchLatestMessage();
  }, []);

  const fetchLatestColor = () => {
    fetch(`${process.env.REACT_APP_LOCAL_HOST}/api/line_statuses`)
      .then((response) => response.json())
      .then((data) => {
        const latestIndex = data.length - 1;
        const latestColor = data[latestIndex].color;
        setInputColor(latestColor);
        const updatedAt = data[latestIndex].updated_at;
        const dateObject = new Date(updatedAt);
        const formattedDate = `${dateObject.toLocaleDateString()}, ${dateObject.toLocaleTimeString()}`;
        setLastUpdatedColor(formattedDate);
      })
      .catch((error) => {
        console.log("Error fetching the latest color:", error);
      });
  };

  const changeStatusTime = (time) => {
    setStatusTime(time);
  };

  useEffect(() => {
    let newStatusTime;

    if (inputColor === "green") {
      newStatusTime = "Not Busy";
    } else if (inputColor === "yellow") {
      newStatusTime = "Moderately Busy";
    } else if (inputColor === "red") {
      newStatusTime = "Busy";
    } else {
      newStatusTime = "No Status Available";
    }

    changeStatusTime(newStatusTime);
  }, [inputColor]);

  useEffect(() => {
    fetchLatestColor();
  }, []);

  const headerRef = useRef(null);
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.focus();
    }
  }, []);

  return (
    <StudentPreviewProvider>
      <UserProvider>
        <MessageContext.Provider
          value={{
            inputMessage,
            setInputMessage,
            fetchLatestMessage,
            lastUpdatedMessage,
            setLastUpdatedMessage,
          }}
        >
          <LineStatusContext.Provider
            value={{
              inputColor,
              setInputColor,
              fetchLatestColor,
              lastUpdatedColor,
              setLastUpdatedColor,
              statusTime,
              setStatusTime,
              changeStatusTime,
            }}
          >
            <Router>
              <TimeslotsProvider>
                <section role="region" aria-label="Header">
                  <Header tabIndex="0" ref={headerRef} />
                </section>
                <Routes>
                  <Route exact path="/" element={<UserLanding />} />
                  {/* <Route
                    exact
                    path="/AdminLanding"
                    element={<AdminLanding />}
                  /> */}
                  <Route exact path="/AboutUs" element={<AboutUs />} />
                  <Route exact path="/FAQ" element={<FAQ />} />
                  <Route exact path="/UserHome" element={<UserHome />} />
                  <Route exact path="/AdminHub" element={<AdminHub />} />
                  <Route
                    exact
                    path="/UserScheduler"
                    element={<UserScheduler />}
                  />
                  <Route exact path="/ContactUs" element={<ContactUs />} />
                </Routes>
                <section aria-label="Footer">
                  <Footer aria-label="Footer" tabIndex="0" />
                </section>
              </TimeslotsProvider>
            </Router>
          </LineStatusContext.Provider>
        </MessageContext.Provider>
      </UserProvider>
    </StudentPreviewProvider>
  );
}

export default App;
