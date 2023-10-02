import React from 'react';
import { useMediaQuery } from "@mui/material";
import './HubViewer.css';
import Image from '../assets/logo.png';

const Viewer = ({prompt, fxn}) => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    return <div  role="region" 
    aria-label="Package Hub Viewer"
     className={`view-hub-wrapper ${isMobile ? 'mobile' : ''}`}>
          <img id="logo"src = {Image} alt = "A small blue devil peeking out of a cardboard box, acting as the website's logo"/>
          <button tabIndex="0" onClick={fxn} id="view-hub-button">{prompt}</button>
    </div>
}

export default Viewer;
