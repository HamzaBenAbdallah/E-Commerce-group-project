import React, { useContext } from "react";
import styled from "styled-components";
import { LadingPageContext } from "./LandingPageContext";

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
  } = useContext(LadingPageContext);

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
          .map((item, idx) => {
            return (
              <>
                <summary key={idx}>
                  {itemCategory === item.category ? (
                    <section>
                      <img src={`${item?.imageSrc}`} alt="item_image" />
                      <p>{item?.name}</p>
                      <p>{item?.price}</p>
                    </section>
                  ) : (
                    <section key={idx}>
                      <img src={`${item?.imageSrc}`} alt="item_image" />
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                    </section>
                  )}
                </summary>
                <ol>
                  {categoryPageNumbers.map((num) => (
                    <li key={num}>
                      <button onClick={() => handlePageClick(num)}>
                        {num + 1}
                      </button>
                    </li>
                  ))}
                </ol>
              </>
            );
          })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & ul {
    list-style-type: none;
    display: flex;
    border: 2px solid green;
    margin: 0;
    padding: 0;

    & li {
      display: flex;
      border: 2px solid blue;
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

    & ol {
      border: 2px solid red;
      list-style-type: none;
      border: 10px solid red;
      display: flex;
      justify-content: center;
      gap: 10px;
      grid-area: numberArea;

      & li {
        display: inline;
        justify-content: center;
        text-align: center;
        border: 2px solid blue;
      }
    }

    & section {
      /* width: 100%; */
      height: 250px;
      border: 10px solid pink;
      align-items: center;
      flex-wrap: wrap;

      & img {
        display: grid;
        margin: auto;
        align-items: center;
        align-self: center;
        border: 2px solid blue;
        height: 150px;
      }

      & p {
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: space-evenly;
        text-align: center;
        border: 2px solid purple;
        margin: 0;
      }
    }
  }
`;

export default Landing;
