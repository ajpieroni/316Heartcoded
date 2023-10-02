import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import HamburgerMenu from "./HamburgerMenu";
import { UserContext } from "./contexts/UserContext";
import "./Header.css";

const Header = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(UserContext);

  const navigateToHome = () => {
    const homeRoute = isAdmin ? "/AdminHub" : "/UserHome";
    navigate(homeRoute);
  };

  const headerTheme = createTheme({
    breakpoints: {
      values: {
        xs: 200,
        sm: 600,
        md: 950,
      },
    },
  });

  const isGFold = useMediaQuery(headerTheme.breakpoints.down("xs"));
  const isMobile = useMediaQuery(headerTheme.breakpoints.down("sm"));
  const isMidsize = useMediaQuery(headerTheme.breakpoints.between("sm","md"));

  return (
    <ThemeProvider theme={headerTheme}>
      <div className={`Header ${isMobile ? "mobile" : ""}${isMidsize ? "mid" : ""}`} ref={ref}>
        <AppBar position="static">
          <Toolbar>
            <div className={`duke-wrapper ${isMobile ? "mobile" : ""}${isMidsize ? "mid" : ""}`}>
              <div
                aria-hidden="true"
                className={`header-duke ${isMobile ? "mobile" : ""}${isMidsize ? "mid" : ""}`}
                onClick={navigateToHome}
              >
                Duke
              </div>
              <div
                role="link"
                tabIndex="0"
                className={`header-sub  ${isMobile ? "mobile" : ""}${isMidsize ? "mid" : ""}${isGFold ? "mobile" : ""}`}
                onClick={navigateToHome}
              >
                Package Pickup Hub
              </div>
            </div>
            <section
              className="hmbrg-sxn"
              role="region"
              aria-label="Navigation Bar"
              tabIndex="-1"
            >
              <HamburgerMenu />
            </section>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
});

export default Header;
