import React, { useState, useEffect, useContext } from "react";
import "./PkgHub.css";
import Package from "./Package";
import axios from "axios";
// import {UserContext} from "../App";
import { UserContext } from "./contexts/UserContext";
import { useMediaQuery } from "@mui/material";

export default function PHub({ setHasPackages, setHasFetched }) {
  const { uniqueId, boxNumber } = React.useContext(UserContext);
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let isComponentMounted = true;
  const [ellipsisDots, setEllipsisDots] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisDots((dots) => (dots < 3 ? dots + 1 : 1));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // ! MEMOIZATION
  let packagesStored = false;
  let lastResult;
  function memoizedFetchPackages() {
    if (packagesStored) {
      return lastResult;
    }
    let result = fetchPackages();
    lastResult = result;

    packagesStored = true;
    return result;
  }
  const fetchPackages = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_HOST}/api/fetch_asset_ids`,
        {
          // unique_id: 1236441,
          // box_number: 99490,
          // *TO MAKE DYNAMIC:
          unique_id: uniqueId,
          box_number: boxNumber,

          // *HARDCODED:
          // unique_id: 1197415,
          // box_number: 98447,
        }
      );

      // Update the packages state with the received data
      if (isComponentMounted) {
        if (response.data.assetIds) {
          setPackages(response.data.assetIds);
          setHasPackages(true);
        } else {
          setPackages([]);
          setHasPackages(false);
        }

        setIsLoading(false);
      }

      if (response.data.error !== "No asset data found") {
        setPackages(response.data.assetIds);
        setHasFetched(true);
      }
      if (response.data.error === "No asset data found") {
        // setPackages([]);
        setHasFetched(true);
        setIsLoading(false);
      }
      if (response.data.length === 0) {
        setHasFetched(true);
        setIsLoading(false);
      }

      // alert("SCLogic Data: ", response.data.assetIds);

      // console.log("sclogic data: ", packages);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    if(uniqueId && boxNumber){
      memoizedFetchPackages();
      // setIsLoading(false);
    }
    return () => {
      isComponentMounted = false; // Update flag variable when component unmounts
    };
  }, [uniqueId, boxNumber, setHasPackages]);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className={`PkgHub ${isMobile ? "mobile" : ""}`}>
      <h2>Packages to Pick Up</h2>
      <div aria-label="Your available packages" className="inner-pickup">
        {isLoading ? (
          <div className="loading">
            Loading packages {".".repeat(ellipsisDots)}
          </div>
        ) : packages.length > 0 ? (
          packages.map((assetId, index) => (
            <div
              aria-label={"Package" + (index + 1)}
              key={"Package" + (index + 1)}
            >
              <Package pkgNum={index + 1} trackingNum={assetId} />
            </div>
          ))
        ) : null}
      </div>
      {!isLoading && packages.length === 0 && (
        <div className="nothing-msg">
          You currently have no packages to pick up.
        </div>
      )}
    </div>
  );
}
