import React, { useContext, useState } from "react";
import styled from "styled-components";
import { PaginationContext } from "../services/PaginateContext";
import ReactPaginate from "react-paginate";
import { FilterContext } from "../services/FilterContext";
import { GlobalContext } from "../services/GlobalContext";

const Pagination = () => {
  const { handlePageClick, productsPerPage, pageNum } =
    useContext(PaginationContext);

  const { filterAllSeletions, getBodyLocation, getCategory } =
    useContext(FilterContext);

  const itemData = useContext(GlobalContext);

  const { getItems } = itemData;
  const getAllItems = Object.values(getItems);

  const [selectedNum, setSelectedNum] = useState();

  let pageNumbers = [];

  const numberOfPages = () => {
    if (getCategory < 1 && getBodyLocation < 1) {
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 1rem;
    width: 800px;
    border-radius: 15px;
    cursor: pointer;

    .selected a {
      color: ${(props) => (props.sameNum ? "white" : "black")};
      background: ${(props) => (props.sameNum ? "#001d6e" : "white")};
    }
  }

  .paginateStyle a {
    padding: 10px;
    margin: 8px;
    border-radius: 5px;
    border: 1px solid #001d6e;
    color: #001d6e;

    :hover {
      color: black;
      background-color: #ccc;
    }

    a.selected {
      color: ${(props) => (props.sameNum ? "white" : "black")};
      background: ${(props) => (props.sameNum ? "#0000a3" : "white")};
    }
  }
`;
