import { GlobalContext } from "./GlobalContext";

import React, { useContext, useState, createContext } from "react";

export const PaginationContext = createContext(null);

export const PaginationProvider = ({ children }) => {
  const itemData = useContext(GlobalContext);
  const { getItems } = itemData;

  // const [numberClicked, setNumberClicked] = useState(false);
  const [pageNum, setPageNum] = useState([0]);

  const productsPerPage = 12;

  const pageVisits = pageNum * productsPerPage;

  // const numberOfPages = (getAllItems.length - 1) / productsPerPage;

  const handlePageClick = (e) => {
    setPageNum(e);
    // setNumberClicked(!numberClicked);
  };

  // let pageNumbers = [];

  // getAllItems.map((x, idx) => {
  //   if (idx <= numberOfPages) {
  //     pageNumbers.push(idx);
  //   }
  // });

  return (
    <PaginationContext.Provider
      value={{
        pageVisits,
        productsPerPage,
        // pageNumbers,
        // numberClicked,
        pageNum,
        handlePageClick,
        // numPages,
        setPageNum,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
