import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { LandingPageContext } from "../services/LandingPageContext";
import { PaginationContext } from "../services/PaginateContext";
import { GlobalContext } from "../services/GlobalContext";
import { FilterContext } from "../services/FilterContext";
import Spinner from "../components/Spinner";

import Card from "../components/Card";

import Pagination from "./Pagination";

const Products = () => {
  const { uniqueCategories, uniqueBodyLocation } =
    useContext(LandingPageContext);

  const { pageVisits, productsPerPage, setPageNum } =
    useContext(PaginationContext);

  const { loadingItems } = useContext(GlobalContext);

  const {
    handleCategory,
    handleBodyLocation,
    filterAllSeletions,
    getAllItems,
    getCategory,
    getBodyLocation,
    isPriceSorted,
    setIsPriceSorted,
  } = useContext(FilterContext);

  const [dropCategory, setDropCategory] = useState(false);
  const [dropBodyLocation, setDropBodyLocation] = useState(false);

  return (
    <Wrapper>
      <Categories>
        <Link
          reloadDocument
          to="/products"
          onClick={() => {
            setTimeout(() => {
              setPageNum(0);
            }, 500);
          }}
        >
          Reset ↻
        </Link>
        <Container>
          <h2 onClick={() => setDropCategory(!dropCategory)}>
            {dropCategory ? <p>Categories ⮟</p> : <p>Categories ⮞</p>}
          </h2>
          <Drop picked={dropCategory}>
            {uniqueCategories.map((itemCategories, idx) => {
              return (
                <label key={idx}>
                  <input
                    onChange={(e) => {
                      handleCategory(e);
                    }}
                    type="checkbox"
                    name="category"
                    value={itemCategories}
                    onClick={() => setPageNum(0)}
                  />
                  <span>{itemCategories}</span>
                </label>
              );
            })}
          </Drop>
          <h2 onClick={() => setDropBodyLocation(!dropBodyLocation)}>
            {dropBodyLocation ? <p>Body Location ⮟</p> : <p>Body Location ⮞</p>}
          </h2>
          <Drop picked={dropBodyLocation}>
            {uniqueBodyLocation.map((bodLoca, idx) => {
              return (
                <label key={idx}>
                  <input
                    onChange={(e) => handleBodyLocation(e)}
                    type="checkbox"
                    name="bodLocation"
                    value={bodLoca}
                    onClick={() => setPageNum(0)}
                  />
                  <span>{bodLoca}</span>
                </label>
              );
            })}
          </Drop>
          <h2 onClick={() => setIsPriceSorted(!isPriceSorted)}>
            {isPriceSorted ? <p>Sort by Price ⮟</p> : <p>Sort by Price ⮝</p>}
          </h2>
        </Container>
      </Categories>
      {loadingItems ? (
        <CardGridWrapper>
          <CardGrid>
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
        </CardGridWrapper>
      ) : (
        <Loading>
          <Spinner />
        </Loading>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 0 5rem;
  gap: 3rem;
`;

const CardGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 80%;
`;

const Drop = styled.div`
  display: ${(props) => (props.picked ? "block" : "none")};
`;

const Container = styled.div`
  border: 2px solid #001d6e;
  border-radius: 5px;
`;

const Categories = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  grid-area: Menu;
  margin-top: 3rem;

  h2 {
    display: flex;
    flex-direction: row;
    padding: 10px 10px 10px 20px;
    cursor: pointer;
    color: white;
    background-color: #001d6e;
    border-bottom: 2px solid white;
    font-size: 1.3rem;

    :last-child {
      border-bottom: none;
    }
    :hover {
      background-color: #2a4991;
      color: white;
    }
  }

  label {
    display: flex;
    align-self: center;
    align-items: center;
    padding-left: 20px;
    height: 35px;
    cursor: pointer;
    margin: 0 10px;
    border-bottom: 1px solid #ccc;

    :hover {
      background-color: #e7e7e7;
    }
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 0.8fr 0.8fr 0.8fr 0.8fr;

  grid-template-areas:
    "Menu . . . ."
    "Menu . . . ."
    "Menu . . . ."
    "Menu . . . .";
  gap: 30px;
  padding: 0 6% 0 1%;
  margin-top: 3rem;
`;

const Link = styled(NavLink)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  width: 50%;
  margin-bottom: 1rem;
  background-color: #767676;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  padding: 5px 5px;
  cursor: pointer;
  font-weight: bold;
  color: white;
`;

const Loading = styled.div`
  margin: auto;
  padding-top: 150px;
`;

export default Products;
