import { createContext } from "react";

export const MessageContext = createContext({
    inputMessage: "No message available.",
    lastUpdated: "",
  setInputMessage: () => {},
  fetchLatestMessage: () => {},
  setLastUpdatedMessage: () => {},
});
