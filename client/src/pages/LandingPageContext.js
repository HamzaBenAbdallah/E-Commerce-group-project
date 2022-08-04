import React, { createContext, useState, useContext } from "react";
import { GlobalContext } from "../services/GlobalContext";

export const LadingPageContext = createContext(null);

export const LadingPageProvider = ({ children }) => {
  const [itemCategory, setItemCategory] = useState([]);
  const [pageNum, setPageNum] = useState([]);
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
    setPageNum(e);
  };

  let categoryPageNumbers = [];

  itemsFromCategory(itemCategory).map((x, idx) => {
    if (idx <= numPages) {
      categoryPageNumbers.push(idx);
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
        handlePageClick,
      }}
    >
      {children}
    </LadingPageContext.Provider>
  );
};
