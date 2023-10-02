import React from 'react';
import Scheduler from '../components/Scheduler';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import "./UserScheduler.css";
import Footer from '../components/Footer';
import { useMediaQuery } from "@mui/material";
// import {UserContext} from "../App";
import {UserContext} from "../components/contexts/UserContext";

function UserScheduler() {
  const {userId, uniqueId, boxNumber} = React.useContext(UserContext);

  const isMobile = useMediaQuery("(max-width: 900px)");

    return (
      <>
      <div className={`Scheduler-wrapper ${isMobile ? 'mobile' : ''}`}>
        <h1 className='page-title'>Schedule Pickup</h1>
        <Scheduler uniqueId = {uniqueId} userId = {userId} boxNumber = {boxNumber}/>
      </div>
      </>
    );
  }

export default UserScheduler;
