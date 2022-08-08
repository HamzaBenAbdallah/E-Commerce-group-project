import React, { useContext } from "react";
import styled from "styled-components";
import { LandingPageContext } from "../services/LandingPageContext";
import Card from "../components/Card";
import Pagination from "./Pagination";

const Products = () => {
  const {
    uniqueCategories,
    handleClick,
    itemsFromCategory,
    pageVisits,
    productsPerPage,
    itemCategory,
    categoryPageNumbers,
    handlePageClick,
  } = useContext(LandingPageContext);

  return (
    <Wrapper>
      <Categories>
        {uniqueCategories.map((itemCategories, idx) => {
          return (
            <li
              key={idx}
              onClick={() => {
                handleClick(itemCategories);
              }}
            >
              {itemCategories}
            </li>
          );
        })}
      </Categories>
      <CardGrid>
        {itemsFromCategory(itemCategory)
          .slice(pageVisits, pageVisits + productsPerPage)
          .map((item) => {
            return <Card key={item.itemID} item={item} />;
          })}
      </CardGrid>
      <Pagination />
      {/* <Paginate>
        {categoryPageNumbers.map((num) => (
          <li key={num} onClick={() => handlePageClick(num)}>
            {num + 1}
          </li>
        ))}
      </Paginate> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  align-items: center;
`;

const Categories = styled.ul`
  width: 100%;
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    border: 2px solid #0000a3;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
    width: 100%;
    height: 35px;
    cursor: pointer;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 80%;
  margin-top: 2rem;
`;

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

export default Products;
