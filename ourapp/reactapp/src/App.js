import React, { useState, useEffect, useRef, createContext } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import
// import headerRef

import UserLogin from "./pages/UserLogin";
import "./App.css";
// import "./Chat.css";
import axios from "axios";
import Chat from "./pages/Chat";
import CreateProfile from "./pages/CreateProfile";
import EditProfile from "./pages/EditProfile";
import Feedback from "./pages/Feedback";
import FindMatch from "./pages/FindMatch";
import Questions from "./pages/Questions";
import { UserContext } from "./components/contexts/UserContext";
import SelectUserForFeedback from "./pages/SelectUserForFeedback";
import UserSignedIn from "./pages/UserSignedIn"
import Conversations from "./pages/Conversations";
import Wingman from "./pages/Wingman";
import MatchList from "./components/MatchList";

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
          <Route exact path="/" element={<UserLogin />} />
          <Route exact path="/Chat" element={<Chat />} />
          <Route exact path="/CreateProfile" element={<CreateProfile />} />
          <Route exact path="/EditProfile" element={<EditProfile />} />
          <Route exact path="/Feedback" element={<Feedback />} />
          <Route
            exact
            path="/SelectUserForFeedback"
            element={<SelectUserForFeedback />}
          />
          <Route exact path = "/Wingman" element = {<Wingman />}/>
          <Route exact path="/FindMatch" element={<FindMatch />} />
          <Route exact path="/Conversations" element={<Conversations />} />
          <Route exact path="/MatchList" element={<MatchList />} />
          <Route exact path="/Questions" element={<Questions />} />
          <Route exact path="/UserSignedIn" element={<UserSignedIn />} />'
          {/* <Route path="/signed-in">
            <UserSignedIn />
          </Route> */}
        </Routes>
        {/* </ScrollToTop> */}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
