import React, { useContext, useState } from "react";
import styled from "styled-components";
import { LandingPageContext } from "../services/LandingPageContext";
import ReactPaginate from "react-paginate";

const Pagination = () => {
  const { categoryPageNumbers, handlePageClick, numPages, pageNum } =
    useContext(LandingPageContext);
  //   const [currentPageNum, setCurrentPageNum] = useState(0);

  console.log(`categoryPageNumbers:`, categoryPageNumbers);

  //   const changePage = ({ selected }) => {
  //     setCurrentPageNum(selected);
  //   };

  const getLastIdx = categoryPageNumbers.at(-1) + 1;

  return (
    <Paginate>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={getLastIdx}
        onPageChange={getLastIdx}
        containerClassName={"paginationBtn"}
        previousLinkClassName={"previousBtn"}
        nextLinkClassName={"nextBtn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      {/* {categoryPageNumbers.slice(0, 5).map((num) => (
        <li key={num} onClick={() => handlePageClick(num)}>
          {num + 1}
        </li>
      ))} */}
    </Paginate>
  );
};

export default Pagination;

const Paginate = styled.ol`
  list-style-type: none;
  display: flex;
  justify-content: center;
  gap: 10px;

  li {
    display: inline;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    padding: 5px 5px;
    border-radius: 5px;
  }
  li:hover {
    color: white;
    background-color: #0000a3;
  }
`;
