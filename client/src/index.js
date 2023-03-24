import ReactDOM from "react-dom/client";
import App from "./components/App";
import { GlobalProvider } from "./services/GlobalContext";
import { LandingPageProvider } from "./services/LandingPageContext";
import { PaginationProvider } from "./services/PaginateContext";
import { FilterProviders } from "./services/FilterContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GlobalProvider>
    <LandingPageProvider>
      <PaginationProvider>
        <FilterProviders>
          <App />
        </FilterProviders>
      </PaginationProvider>
    </LandingPageProvider>
  </GlobalProvider>
);
