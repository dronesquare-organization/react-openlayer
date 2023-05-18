import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Map } from "./lib";
import "./lib/react-openlayer.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Map>
      <App />
    </Map>
  </React.StrictMode>
);
