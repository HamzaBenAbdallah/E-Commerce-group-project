import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { GlobalProvider } from "./services/GlobalContext";
import { LandingPageProvider } from "./services/LandingPageContext";
ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <LandingPageProvider>
        <App />
      </LandingPageProvider>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
