import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.tsx";

/**
 * The entry point for the React application.
 * It mounts the App component into the root DOM element.
 */
createRoot(document.getElementById("root")!).render(
  // StrictMode helps identify potential problems in the application during development
  <StrictMode>
    {/* The main App component containing routing and providers */}
    <App />
  </StrictMode>
);
