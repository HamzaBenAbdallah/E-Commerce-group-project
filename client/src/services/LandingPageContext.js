import React, { createContext, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import Card from "../components/Card";
export const LadingPageContext = createContext(null);

export const LadingPageProvider = ({ children }) => {
  const [itemCategory, setItemCategory] = useState([]);
  const [pageNum, setPageNum] = useState([]);
  const [numberClicked, setNumberClicked] = useState(false);

  const itemData = useContext(GlobalContext);

  const { getItems } = itemData;

  const productsPerPage = 15;

  const pageVisits = pageNum * productsPerPage;

  const objToArray = Object.entries(getItems).map(([itemID, idx]) => ({
    itemID,
    ...idx,
  }));

  const categories = objToArray.map((items) => {
    return items.category;
  });
  categories.unshift("All Products");

  const uniqueCategories = [...new Set(categories)];

  const itemsFromCategory = (productCategory) => {
    return objToArray.filter((item) => {
      if (item.category === productCategory) {
        return true;
      } else if (productCategory < 1) {
        return true;
      } else if (productCategory === "All Products") {
        return true;
      }
    });
  };

  const handleClick = (event) => {
    if (event !== itemCategory) {
      return setPageNum(0), setItemCategory(event);
    }
  };

  let numPages = Math.floor(
    (itemsFromCategory(itemCategory).length - 1) / productsPerPage
  );

  const handlePageClick = (e) => {
    return setPageNum(e), setNumberClicked(!numberClicked);
  };

  let categoryPageNumbers = [];

  itemsFromCategory(itemCategory).map((x, idx) => {
    if (idx <= numPages) {
      categoryPageNumbers.push(idx);
    }
  });

  const productsInStock = itemsFromCategory(itemCategory).filter((item) => {
    if (item.numInStock > 3) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <LadingPageContext.Provider
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
      }}
    >
      {children}
    </LadingPageContext.Provider>
  );
};
