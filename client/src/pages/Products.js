import React, { useContext, useState } from "react";
import styled from "styled-components";
import { LandingPageContext } from "../services/LandingPageContext";
import { GlobalContext } from "../services/GlobalContext";
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
    uniqueBodyLocation,
    companyNumber,
    pageNum,
  } = useContext(LandingPageContext);

  const { getCompany, getItems } = useContext(GlobalContext);
  // console.log(`getCompany:`, getCompany);
  // console.log(`getItems:`, getItems);
  // let arr = [];

  const [dropDownClicked, setDropDownClicked] = useState(false);
  // const [dropCategory, setDropCategory] = useState(false);
  // const [dropCompany, setDropCompany] = useState(false);
  const [checked, setChecked] = useState([]);

  // console.log(`itemsFromCategory:`, itemsFromCategory(""));
  const handleChange = (data) => {
    console.log(` target:`, data.target);
    console.log(` value:`, data.target.value);
    console.log(`isChecked:`, data.target.checked);
  };

  return (
    <Wrapper>
      <CardGrid>
        <Categories>
          <h2 onClick={() => setDropDownClicked(!dropDownClicked)}>
            {dropDownClicked ? <p>Categories ⮟</p> : <p>Categories ⮞</p>}
          </h2>
          <Drop picked={dropDownClicked}>
            {uniqueCategories.map((itemCategories, idx) => {
              return (
                <li
                  key={idx}
                  // onClick={() => {
                  //   handleClick(itemCategories);
                  // }}
                >
                  <input
                    type="checkbox"
                    id="category"
                    name="category"
                    value={itemCategories}
                    onChange={(e) => handleChange(e)}
                  />
                  {itemCategories}
                </li>
              );
            })}
          </Drop>
        </Categories>
        {itemsFromCategory(itemCategory)
          .slice(pageVisits, pageVisits + productsPerPage)
          .map((item) => {
            return <Card key={item.itemID} item={item} />;
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
`;

export default Products;
