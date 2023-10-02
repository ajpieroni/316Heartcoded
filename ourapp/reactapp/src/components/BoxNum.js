import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import "./BoxNum.css";
// import { UserContext } from '../App';
import {UserContext} from "./contexts/UserContext";
import { useMediaQuery } from "@mui/material";

export default function BoxNum() {
  const {boxNumber} = React.useContext(UserContext);
  const [data, setData] = useState(null);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div role="region" aria-label="Box Number" tabIndex="-1" className={`BoxNum ${isMobile ? 'mobile' : ''}`}>
      <h2>Your Box Number</h2>
      <div className="box-box">
        <p>{boxNumber}</p>
      </div>
    </div>
  );
}
