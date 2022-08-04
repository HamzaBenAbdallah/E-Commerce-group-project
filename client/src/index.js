import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { GlobalProvider } from "./services/GlobalContext";
import { LadingPageProvider } from "./pages/LandingPageContext";
ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <LadingPageProvider>
        <App />
      </LadingPageProvider>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
