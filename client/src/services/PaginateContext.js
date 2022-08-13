import { GlobalContext } from "./GlobalContext";

import React, { useContext, useState, createContext } from "react";

export const PaginationContext = createContext(null);

export const PaginationProvider = ({ children }) => {
  const [pageNum, setPageNum] = useState([0]);

  const productsPerPage = 12;

  const pageVisits = pageNum * productsPerPage;

  const handlePageClick = (e) => {
    setPageNum(e);
  };

  return (
    <PaginationContext.Provider
      value={{
        pageVisits,
        productsPerPage,
        pageNum,
        handlePageClick,
        setPageNum,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
