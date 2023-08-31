import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import "./pinkflix-overview.css";
// import "./pinkflix.css";
// import "./pinkflix-review.css";
import App from "./App";
import { GlobalContextProvider } from "./context/global";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>
);
