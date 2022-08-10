import React, { createContext, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
export const LandingPageContext = createContext(null);

export const LandingPageProvider = ({ children }) => {
  const [itemCategory, setItemCategory] = useState([]);
  const [pageNum, setPageNum] = useState([]);
  const [numberClicked, setNumberClicked] = useState(false);

  const itemData = useContext(GlobalContext);

  const { getItems } = itemData;

  const productsPerPage = 12;

  const pageVisits = pageNum * productsPerPage;

  const objToArray = Object.entries(getItems).map(([itemID, idx]) => ({
    itemID,
    ...idx,
  }));

  const categories = objToArray.map((items) => {
    return items.category;
  });

  const uniqueCategories = [...new Set(categories)];

  const bodyLocation = objToArray.map((items) => {
    return items.body_location;
  });

  const uniqueBodyLocation = [...new Set(bodyLocation)];

  const brandID = objToArray.map((id) => {
    return id.companyId;
  });

  const companyNumber = [...new Set(brandID)];
  // console.log(`companyNumber:`, companyNumber);
  // console.log(`uniqueBodyLocation:`, uniqueBodyLocation);

  // categories.unshift("All Products");

  const itemsFromCategory = (productCategory) => {
    return objToArray.filter((item) => {
      if (item.category === productCategory) {
        return true;
      } else if (productCategory < 1) {
        return true;
      }
      // else if (productCategory === "All Products") {
      //   return true;
      // }
    });
  };

  const handleClick = (event) => {
    if (event !== itemCategory) {
      setPageNum(0);
      setItemCategory(event);
    }
  };

  let numPages = Math.floor(
    (itemsFromCategory(itemCategory).length - 1) / productsPerPage
  );

  const handlePageClick = (e) => {
    setPageNum(e);
    setNumberClicked(!numberClicked);
  };

  let categoryPageNumbers = [];

  itemsFromCategory(itemCategory).map((x, idx) => {
    if (idx <= numPages) {
      categoryPageNumbers.push(idx);
    }
  });

  const productsInStock = itemsFromCategory("").filter((item) => {
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
        handleClick,
        itemsFromCategory,
        pageVisits,
        productsPerPage,
        itemCategory,
        categoryPageNumbers,
        numberClicked,
        pageNum,
        handlePageClick,
        productsInStock,
        uniqueBodyLocation,
        companyNumber,
      }}
    >
      {children}
    </LandingPageContext.Provider>
  );
};
