import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { GlobalProvider } from "./services/GlobalContext";

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
