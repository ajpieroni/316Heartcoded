import { createContext } from "react";

export const LineStatusContext = createContext({
    inputColor: "",
    lastUpdatedColor: "",
    statusTime: "",
  setInputColor: () => {},
  fetchLatestColor: () => {},
  setLastUpdatedColor: () => {},
  setStatusTime: () => {},
  changeStatusTime: () => {},
});

