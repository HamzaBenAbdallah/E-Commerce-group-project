import React, { useContext, useState } from "react";
import styled from "styled-components";
import { PaginationContext } from "../services/PaginateContext";
import ReactPaginate from "react-paginate";

const Pagination = () => {
  const { categoryPageNumbers, handlePageClick, pageNum } =
    useContext(PaginationContext);

  const [selectedNum, setSelectedNum] = useState();

  const getLastIdx = categoryPageNumbers.at(-1) + 1;

  const handlePageUpdate = (event) => {
    setSelectedNum(event.selected);
    handlePageClick(event.selected);
  };

  return (
    <Paginate sameNum={pageNum === selectedNum}>
      <ReactPaginate
        previousLabel="< Previous"
        nextLabel="Next >"
        pageCount={getLastIdx}
        onPageChange={handlePageUpdate}
        pageRangeDisplayed={3}
        className={"paginateStyle"}
        marginPagesDisplayed={1}
      />
    </Paginate>
  );
};

export default Pagination;

const Paginate = styled.div`
  list-style-type: none;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-bottom: 20px;

  .paginateStyle {
    font-weight: bold;
    border: 2px solid red;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 500px;

    .selected {
      color: ${(props) => (props.sameNum ? "white" : "black")};
      background: ${(props) => (props.sameNum ? "#0000a3" : "white")};
    }

    li {
      display: inline;
      justify-content: center;
      text-align: center;
      cursor: pointer;
      padding: 5px 5px;
      border-radius: 5px;
    }
    li:hover {
      background-color: #ccc;
    }
  }
`;
