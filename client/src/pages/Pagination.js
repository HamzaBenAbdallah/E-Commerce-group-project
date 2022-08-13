import React, { useContext, useState } from "react";
import styled from "styled-components";
import { PaginationContext } from "../services/PaginateContext";
import ReactPaginate from "react-paginate";
import { FilterContext } from "../services/FilterContext";
import { GlobalContext } from "../services/GlobalContext";

const Pagination = () => {
  const { handlePageClick, productsPerPage, pageNum } =
    useContext(PaginationContext);

  const { filterAllSeletions } = useContext(FilterContext);

  const itemData = useContext(GlobalContext);

  const { getItems } = itemData;
  const getAllItems = Object.values(getItems);

  const [selectedNum, setSelectedNum] = useState();

  let pageNumbers = [];

  const numberOfPages = () => {
    if (filterAllSeletions.length < 1) {
      return (getAllItems.length - 1) / productsPerPage;
    } else if (filterAllSeletions.length > 0) {
      return (filterAllSeletions.length - 1) / productsPerPage;
    }
  };

  getAllItems.map((x, idx) => {
    if (idx <= numberOfPages()) {
      pageNumbers.push(idx);
    }
  });

  const getLastIdx = pageNumbers.at(-1) + 1;

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
  padding: 0 50px;

  padding-bottom: 20px;

  .paginateStyle {
    font-weight: bold;
    border: 2px solid red;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
    width: 1000px;

    .selected {
      color: ${(props) => (props.sameNum ? "white" : "black")};
      background: ${(props) => (props.sameNum ? "#0000a3" : "white")};
    }

    li {
      display: inline;
      justify-content: center;
      text-align: center;
      cursor: pointer;
      padding: 5px 15px;
      border-radius: 5px;
    }
    li:hover {
      background-color: #ccc;
    }
  }
`;
