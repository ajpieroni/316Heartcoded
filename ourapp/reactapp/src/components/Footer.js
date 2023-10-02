import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import Image from "../assets/arches.png";
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useMediaQuery } from "@mui/material";

export default function Footer() {
  const navigate = useNavigate();
  const navigateToContact = () => {
    navigate("/ContactUs");
  };

  const isMobile = useMediaQuery("(max-width: 600px)"); // Adjust the breakpoint as needed

  return (
    <div tabIndex="0" aria-label="Footer" className={`Footer ${isMobile ? 'mobile' : ''}`}>
      <div className="contact-info">
        <div className="address"><PlaceIcon className="contact-icon" />3523 Hillsborough Rd Durham, NC 27705</div>
        <div className="email"><EmailIcon className="contact-icon" /><a href="mailto:dukepostoffice@duke.edu">dukepostoffice@duke.edu</a></div>
        <div className="phone"><CallIcon className="contact-icon" />919-382-4500</div>
        <div className="mail">
          <LocalShippingIcon className="contact-icon" />
          Mail Correspondence: Box 90813 Durham, NC 27708-0813
        </div>
      </div>
      {!isMobile && (<img src={Image} alt="Duke Stylized Arches" />)}
    </div>
  );
}
