import { createContext } from "react";
import { useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={{ itemsIdsInCart, setItemsIdsInCart }}>
      {children}
    </GlobalContext.Provider>
  );
};
