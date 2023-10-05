import React, { useState, useEffect, useRef, createContext } from "react";
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import 
// import headerRef

import UserLanding from "./pages/UserLanding";
import "./App.css";
// import "./Chat.css";
import axios from "axios";
import Chat from "./pages/Chat";
import CreateProfile from "./pages/CreateProfile";
import Feedback from "./pages/Feedback";
import FindMatch from "./pages/FindMatch";
import Questions from "./pages/Questions";
import { UserContext } from "./components/contexts/UserContext";

function App() {

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
      <ScrollToTop />

        <Routes>
          <Route exact path="/" element={<UserLanding />} />
          <Route exact path="/Chat" element={<Chat />} />
          <Route exact path="/CreateProfile" element={<CreateProfile />} />
          <Route exact path="/Feedback" element={<Feedback />} />
          <Route exact path="/FindMatch" element={<FindMatch />} />
          <Route exact path="/Questions" element={<Questions />} />
        </Routes>
      {/* </ScrollToTop> */}

      </Router>
    </UserContext.Provider>
  );
}

export default App;
