import styled from "styled-components";
import React, { useState } from "react";

const Confirmation = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  console.log(isClicked);
  return (
    <Container>
      <h1>Your order is on it's way!</h1>
      <span>
        Once we ship your order you will receive an email with the shipping
        details.
      </span>
      <h2>Details</h2>
      <div>
        <p>Order on:</p>
        <p>Order #:</p>
      </div>
      <ol>
        <summary>
          <li>
            <img
              src="https://cdn.shopify.com/s/files/1/0019/4471/5373/products/NY0158-09L_300x.png?v=1651161188"
              alt="product"
            />
          </li>
          <List onClick={handleClick} areaIsClicked={isClicked}>
            <h2>Order summary</h2>
            <p>Name:</p>
            <p>Quantity:</p>
            <p>Item(s) subtotal</p>
            <p>Shipping and Handling: $10.00</p>
            <p>Total before tax</p>
            <p>Estimated GST/HST:</p>
            <p>Estimated PST/RST/QST:</p>
            <p>Grand Total</p>
          </List>
        </summary>
      </ol>
      <button>Homepage</button>
    </Container>
  );
};

export default Confirmation;

const List = styled.li`
  width: 50%;
  margin: auto;
  text-align: left;
  background: lime;
  opacity: ${(props) => (props.areaIsClicked ? 0.2 : 1)};
`;

const Container = styled.div`
  border: 10px solid green;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding-top: 3%;

  ${List} {
  }

  h1 {
    border: 2px solid pink;
  }
  span {
    color: green;
    border: 12px solid blue;
  }

  h2 {
    padding: 10px 0;
  }

  div {
    display: flex;
    width: 20vw;
    border: 2px solid green;
    justify-content: space-evenly;
    padding-bottom: 10px;
  }

  summary {
    border: 2px solid orange;
    display: flex;
    text-align: center;
    width: 30vw;
    /* flex-direction: row; */
  }
  li:first-child {
    margin: auto;
    background: lime;
  }

  span {
    font-weight: 700;
  }

  h1 {
    font-size: 2rem;
    padding-bottom: 1rem;
  }

  ol {
    img {
      height: 200px;
    }
  }
`;
