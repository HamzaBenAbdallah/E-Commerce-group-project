import React, { useContext, Fragment, useState } from "react";
import styled from "styled-components";
import { LadingPageContext } from "./LandingPageContext";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const {
    uniqueCategories,
    handleClick,
    itemsFromCategory,
    pageVisits,
    productsPerPage,
    itemCategory,
    categoryPageNumbers,
    handlePageClick,
    // pageNum,
    // numberClicked,
  } = useContext(LadingPageContext);

  let navigate = useNavigate();

  const handleRedirection = (e) => {
    let childElem = e.target.parentNode.getAttribute("id");
    let parentWrapper = e.target.id;
    if (childElem !== null || (childElem !== "" && parentWrapper.length < 1)) {
      navigate(`/products/${childElem}`);
    } else if (
      parentWrapper !== null ||
      (parentWrapper !== "" && childElem.length < 1)
    ) {
      navigate(`/products/${parentWrapper}`);
    }
  };

  return (
    <Wrapper>
      <ul>
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
      </ul>
      <div>
        {itemsFromCategory(itemCategory)
          .slice(pageVisits, pageVisits + productsPerPage)
          .map((item) => {
            return (
              <Fragment key={item.itemID}>
                {itemCategory === item.category ? (
                  <section
                    id={item.itemID}
                    onClick={(e) => handleRedirection(e)}
                  >
                    <img src={`${item?.imageSrc}`} alt="item_image" />
                    <p>{item?.name}</p>
                    <p>{item?.price}</p>
                  </section>
                ) : (
                  <section
                    id={item.itemID}
                    onClick={(e) => handleRedirection(e)}
                  >
                    <img src={`${item?.imageSrc}`} alt="item_image" />
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                  </section>
                )}
              </Fragment>
            );
          })}
      </div>
      <ol>
        {categoryPageNumbers.map((num) => (
          <li key={num} onClick={() => handlePageClick(num)}>
            {num + 1}
          </li>
        ))}
      </ol>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & ul {
    list-style-type: none;
    display: flex;
    margin: 0;
    padding: 0;

    & li {
      display: flex;
      border: 2px solid #0000a3;
      align-items: center;
      justify-content: space-evenly;
      text-align: center;
      width: 100%;
      flex-wrap: wrap;
      height: 35px;
      cursor: pointer;
    }
  }

  & div {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      ". . . ."
      ". . . ."
      ". . . ."
      ". numberArea numberArea .";
    gap: 20px 50px;
    justify-items: center;
    padding: 2% 2% 0 2%;
    flex-wrap: wrap;

    & section {
      height: 250px;
      width: 100%;
      align-items: center;
      flex-wrap: wrap;
      cursor: pointer;

      & img {
        display: grid;
        margin: auto;
        align-items: center;
        align-self: center;
        height: 150px;
      }

      & p {
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: space-evenly;
        text-align: center;
        padding-top: 15px;
        margin: 0;
      }
    }
  }

  & ol {
    list-style-type: none;
    display: flex;
    justify-content: center;
    gap: 10px;
    grid-area: numberArea;

    & li {
      display: inline;
      justify-content: center;
      text-align: center;
      cursor: pointer;
      padding: 5px 5px;
      border-radius: 5px;
    }

    & li:hover {
      color: white;
      background-color: #0000a3;
    }
  }
`;

export default Landing;
