import React, { createContext, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export const LandingPageContext = createContext(null);

export const LandingPageProvider = ({ children }) => {
  // const [itemCategory, setItemCategory] = useState([]);
  // const [pageNum, setPageNum] = useState([]);

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

  // const itemsFromCategory =
  //    getAllItems.filter((item) => {
  //     if (item.category === productCategory) {
  //       return true;
  //     } else if (productCategory < 1) {
  //       return true;
  //     } else if (productCategory === "All Products") {
  //       return true;
  //     }
  //   });
  // };

  // const handleClick = (event) => {
  //   if (event !== itemCategory) {
  //     setPageNum(0);
  //     setItemCategory(event);
  //   }
  // };

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
        // handleClick,
        // itemsFromCategory,
        // itemCategory,
        // pageNum,
        productsInStock,
        uniqueBodyLocation,
        // setPageNum,
      }}
    >
      {children}
    </LandingPageContext.Provider>
  );
};
