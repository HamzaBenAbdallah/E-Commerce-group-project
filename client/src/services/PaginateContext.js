import { LandingPageContext } from "./LandingPageContext";
import React, { useContext, useState, createContext } from "react";

export const PaginationContext = createContext(null);

export const PaginationProvider = ({ children }) => {
  const { pageNum, itemsFromCategory, itemCategory, setPageNum } =
    useContext(LandingPageContext);

  const [numberClicked, setNumberClicked] = useState(false);

  const productsPerPage = 12;

  const pageVisits = pageNum * productsPerPage;

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

  return (
    <PaginationContext.Provider
      value={{
        pageVisits,
        productsPerPage,
        categoryPageNumbers,
        numberClicked,
        pageNum,
        handlePageClick,
        setPageNum,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
