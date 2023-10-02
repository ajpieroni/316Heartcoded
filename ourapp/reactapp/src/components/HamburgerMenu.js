import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';


const navigationLinks = [
  // { name: "User Landing", to: "/" },
  // !TODO: Remove before deployment, give admins a separate link.
  // { name: "Admin Landing", to: "/AdminLanding"},
  { name: "FAQ", to: "/FAQ" },
  { name: "About Us", to: "/AboutUs" },
  // { name: "User Home", to: "/UserHome" },
  // { name: "Admin Hub", to: "/AdminHub" },
  { name: "Contact Us", to: "/ContactUs" },
  // { name: "Admin Landing", to: "/AdminLanding"}
];

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#012169",
    width: "auto",
    boxShadow: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  link: {
    marginRight: 20,
    fontFamily: "Open Sans",
    fontSize: 20,
    textDecoration: "none",
    color: "white",
    fontWeight: 800,
    transition: "background-color 0.3s ease-in-out",
    margin: "33px 88px 19px 48px",
    "&:hover": {
      backgroundColor: "#00539B",
      borderBottom: "1px solid #ffffff",
    },
    [theme.breakpoints.down("xs")]: {
      color: "white",
      margin: 0,
      "&:hover": {
        backgroundColor: "#ffffff",
        borderBottom: "1px solid black",
      },
    },
  },
  // ... (existing styles) ...

  // New CSS class for the hamburger menu container
  hamburgerMenu: {
    display: "flex",
    alignItems: "center",
  },

  // New CSS class for the logout button container
  logoutButton: {
    marginLeft: "20px", // Adjust this value as needed to control the space between hamburger menu and logout button
  },
}));

export default function HamburgerMenu() {
  const { displayName } = React.useContext(UserContext);

  const [displayString, setDisplayString] = useState("");
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  useEffect(() => {
    if (displayName) {
      setDisplayString(displayName.split(" ")[0]);
    }
  }, [displayName]);

  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const location = useLocation();

  const pagesWithLogout = ["/UserHome", "/AdminHub"];
  const showLogoutButton = pagesWithLogout.includes(location.pathname);

  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Loggin out!");
    setAnchorElUser(null);
    // *TODO: Add log out link for deployment
    // navigate("https://shib.oit.duke.edu/cgi-bin/logout.pl");
    // component='a' href="https://shib.oit.duke.edu/cgi-bin/logout.pl">

  };

  return (
    <AppBar position="sticky" className={styles.appBar}>
      <Container maxWidth="md">
        <ToolBar
          className={`${styles.appBar} ${isMobile ? styles.toolbar : ""}`}
        >
          <div className={styles.hamburgerMenu}>
            <Hidden xsDown>
              {navigationLinks.map((item) => (
                <Link
                  role="link"
                  aria-label={item.name}
                  className={`${styles.link} ${styles.whiteOption}`}
                  color="inherit"
                  variant="button"
                  underline="none"
                  to={item.to}
                  key={item.name}
                  tabIndex="0"
                >
                  {item.name}
                </Link>
              ))}
            </Hidden>
            <Hidden smUp>
              <IconButton
                aria-label="Hamburger Menu Button"
                className={`${styles.button} ${styles.whiteOption}`}
                onClick={() => {
                  setOpen(true);
                  // aria-expanded="true";
                }}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </div>
          <Hidden xsDown>
            <div className={styles.logoutButton}>
              {showLogoutButton && (
                <div className="logout-btn">

                  <Button
                    color = "inherit"
                    variant="outlined"
                    onClick={handleLogout}
                    component="a"
                    href="https://shib.oit.duke.edu/cgi-bin/logout.pl"
                  >
                    Logout {displayString}

                    <LogoutIcon id = "lo-icon"/>
                  </Button>

                </div>
              )}
            </div>
          </Hidden>
        </ToolBar>
      </Container>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        classes={{ paper: styles.muiPaperRoot }}
      >
        <div className={styles.drawerHeader} onClick={() => setOpen(false)}>
          <IconButton>
            <ChevronRightIcon style={{ color: "white" }} />
          </IconButton>
        </div>
        <Divider />
        <List>
          {navigationLinks.map((item) => (
            <ListItem key={item.name}>
              <Link
                className={styles.link}
                color="textPrimary"
                variant="button"
                underline="none"
                to={item.to}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            </ListItem>
          ))}{" "}
          {showLogoutButton && (
            <div className="logout-btn-hmbrg">
              <Button
                color="inherit"
                variant="outlined"
                onClick={handleLogout}
                component="a"
                href="https://shib.oit.duke.edu/cgi-bin/logout.pl"
              >
                Logout, {displayString}
              </Button>
            </div>
          )}
        </List>
      </SwipeableDrawer>
    </AppBar>
  );
}
