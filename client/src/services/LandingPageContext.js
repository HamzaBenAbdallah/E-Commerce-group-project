import React, { createContext, useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export const LandingPageContext = createContext(null);

export const LandingPageProvider = ({ children }) => {
  const itemData = useContext(GlobalContext);

  const { getItems } = itemData;

  const getAllItems = Object.values(getItems);

  const categories = getAllItems.map((items) => {
    return items.category;
  });

  const uniqueCategories = [...new Set(categories)];

  const BodyLocation = getAllItems.map((items) => {
    return items.body_location;
  });

  const uniqueBodyLocation = [...new Set(BodyLocation)];

  const productsInStock = getAllItems.filter((item) => {
    if (item.numInStock > 3) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <LandingPageContext.Provider
      value={{
        uniqueCategories,
        productsInStock,
        uniqueBodyLocation,
      }}
    >
      {children}
    </LandingPageContext.Provider>
  );
};
