import React, { useContext, useState } from "react";
import styled from "styled-components";
import { LandingPageContext } from "../services/LandingPageContext";
import { PaginationContext } from "../services/PaginateContext";
import { FilterContext } from "../services/FilterContext";
import Card from "../components/Card";
import Pagination from "./Pagination";

const Products = () => {
  const { uniqueCategories, uniqueBodyLocation } =
    useContext(LandingPageContext);

  const { pageVisits, productsPerPage } = useContext(PaginationContext);

  const {
    handleCategory,
    handleBodyLocation,
    filterAllSeletions,
    getAllItems,
    getCategory,
    getBodyLocation,
  } = useContext(FilterContext);

  const [dropCategory, setDropCategory] = useState(false);
  const [dropBodyLocation, setDropBodyLocation] = useState(false);

  return (
    <Wrapper>
      <CardGrid>
        <Categories>
          <h2 onClick={() => setDropCategory(!dropCategory)}>
            {dropCategory ? <p>Categories ⮟</p> : <p>Categories ⮞</p>}
          </h2>
          <Drop picked={dropCategory}>
            {uniqueCategories.map((itemCategories, idx) => {
              return (
                <li key={idx}>
                  <input
                    type="checkbox"
                    id="category"
                    name="category"
                    value={itemCategories}
                    onChange={(e) => handleCategory(e)}
                  />
                  {itemCategories}
                </li>
              );
            })}
          </Drop>
          <h2 onClick={() => setDropBodyLocation(!dropBodyLocation)}>
            {dropBodyLocation ? <p>Body Location ⮟</p> : <p>Body Location ⮞</p>}
          </h2>
          <Drop picked={dropBodyLocation}>
            {uniqueBodyLocation.map((bodLoca, idx) => {
              return (
                <li key={idx}>
                  <input
                    type="checkbox"
                    id="bodLocation"
                    name="bodLocation"
                    value={bodLoca}
                    onChange={(e) => handleBodyLocation(e)}
                  />
                  {bodLoca}
                </li>
              );
            })}
          </Drop>
        </Categories>
        {getCategory.length < 1 && getBodyLocation.length < 1
          ? getAllItems
              .slice(pageVisits, pageVisits + productsPerPage)
              .map((item, idx) => {
                return <Card key={idx} item={item} />;
              })
          : filterAllSeletions
              .slice(pageVisits, pageVisits + productsPerPage)
              .map((item, idx) => {
                return <Card key={idx} item={item} />;
              })}
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

const Drop = styled.div`
  display: ${(props) => (props.picked ? "block" : "none")};
`;

const Categories = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  list-style-type: none;

  grid-area: Menu;

  h2 {
    display: flex;
    flex-direction: row;
    padding-left: 20px;
    cursor: pointer;
    border: 2px solid red;
  }

  li {
    display: flex;
    border: 2px solid #0000a3;
    align-items: center;
    padding-left: 20px;
    text-align: center;
    width: 100%;
    height: 35px;
    cursor: pointer;
  }
`;

const Category = styled.div`
  display: ${(props) => (props.picked ? "block" : "none")};
`;

const Company = styled.div`
  height: 300px;
  overflow: scroll;
  display: ${(props) => (props.selected ? "block" : "none")};
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
  width: 100vw;
`;

export default Products;
