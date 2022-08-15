import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { GlobalProvider } from "./services/GlobalContext";
import { LandingPageProvider } from "./services/LandingPageContext";
import { PaginationProvider } from "./services/PaginateContext";
import { FilterProviders } from "./services/FilterContext";

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <LandingPageProvider>
        <PaginationProvider>
          <FilterProviders>
            <App />
          </FilterProviders>
        </PaginationProvider>
      </LandingPageProvider>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
