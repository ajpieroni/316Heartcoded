import './Landing.css';
import LineStatus from '../components/LineStatus';
import { useMediaQuery } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Viewer from '../components/HubViewer';
// import Image from '../assets/logo.png';

// Message imports
import Message from '../components/Message';
import { MessageContext } from '../components/contexts/MessageContext';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { LineStatusContext } from '../components/contexts/LineStatusContext';

export default function UserLanding() {
  const {inputColor, setInputColor, lastUpdatedColor, setLastUpdatedColor, statusTime, setStatusTime} = useContext(LineStatusContext);

  //Message Logic
  const { inputMessage, lastUpdatedMessage } = useContext(MessageContext);

  const isMobile = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/UserHome');
    // *TODO: add shib login
    window.location = `${process.env.REACT_APP_LOCAL_HOST}/login?target=${process.env.REACT_APP_FRONTEND_HOST}/UserHome`;
    // navigate("/Shibboleth.sso/Login?target=#{URI.encode_www_form_component(target)}");
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });

    return formattedDate;
  }

  return (
    <div className='Onboard'>
      {/* {console.log("Process: ", process.env)} */}
      {/* {console.log(`Here is host: ${process.env.REACT_APP_FRONTEND_HOST}`)} */}
      <div className={`content-wrapper ${isMobile ? 'mobile' : ''}`}>

        <div className={`mail-status ${isMobile ? 'mobile' : ''}`}>
          <LineStatus
            color={inputColor}
            est={statusTime}
            update={lastUpdatedColor} // Call formatDate directly here
          />

          <Message message={inputMessage} time={lastUpdatedMessage} />

        </div>

        

        <Viewer prompt="View Package Pickup Hub" fxn={navigateToHome} />
        <div id="space-holder"></div>
      </div>
    </div>
  );
}
