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
    pageNum,
  } = useContext(LandingPageContext);

  console.log(`pageNum:`, pageNum);

  return (
    <Wrapper>
      <CardGrid>
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
        {itemsFromCategory(itemCategory)
          .slice(pageVisits, pageVisits + productsPerPage)
          .map((item) => {
            return <Card key={item.itemID} item={item} />;
          })}
        {/* add filter brand(companyID), body location, price, categories*/}
      </CardGrid>
      <Pagination />
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
  flex-direction: column;
  list-style-type: none;
  /* margin: 0;
  padding: 0; */
  grid-area: Menu;

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
  grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "Menu . . . ."
    "Menu . . . ."
    "Menu . . . ."
    "Menu . . . .";
  gap: 30px;
  padding: 0 6% 0 1%;
  margin-top: 2rem;
`;

export default Products;
