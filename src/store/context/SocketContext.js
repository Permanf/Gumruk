import { createContext } from "react";

export const SocketContext = createContext();
export const SERVER_URL =
  process.env.REACT_APP_IS_PRODUCTION === "production"
    ? process.env.REACT_APP_API_BASE_PRODUCTION_URL
    : process.env.REACT_APP_API_BASE_URL;
