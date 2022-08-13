import styled from "styled-components";
import React, { useContext } from "react";
import { GlobalContext } from "../services/GlobalContext";
import { Link } from "react-router-dom";

const Confirmation = () => {
  const { customerData, boughtItem } = useContext(GlobalContext);

  let subCost = 0;

  boughtItem.forEach((allPurchases) => {
    const numberCost = Number(allPurchases.price.substring(1));
    return (subCost += numberCost);
  });

  const shipAndHand = 10;
  const totalBeforeTax = subCost + shipAndHand;
  const gstHst = Number(((subCost + shipAndHand) * 0.05).toFixed(2));
  const pstRstQst = Number(((subCost + shipAndHand) * 0.09975).toFixed(2));
  const grandTotal = (totalBeforeTax + gstHst + pstRstQst).toFixed(2);
  return (
    <Container>
      <h1>Your order is on it's way!</h1>
      <span>
        Once we ship your order you will receive an email with the shipping
        details.
      </span>

      <h2>Order summary</h2>
      <div>
        <p>Order on:</p>
        <p>Order #:</p>
      </div>
      <div>
        <p>Name: {customerData.firstName}</p>
        {customerData?.apt ? (
          <p>
            Shipping Address:{customerData.apt}-{customerData.address}
          </p>
        ) : (
          <p>Shipping Address: {customerData.address}</p>
        )}
      </div>
      <ol>
        {boughtItem.map((purchase) => {
          console.log(`purchase:`, purchase.name);
          return (
            <summary>
              <li>
                <img src={`${purchase?.imageSrc}`} alt="product" />
              </li>
              <List>
                <p>
                  <span>Product: </span>
                  {purchase?.name}
                </p>
                <br></br>
                <p>
                  <span>Quantity:</span> {purchase?.quantity}
                </p>
                <br></br>
                <p>
                  <span>Cost:</span> {purchase.price}
                </p>
              </List>
            </summary>
          );
        })}
      </ol>
      <Cost>
        <p>Item(s) subtotal: ${subCost}</p>
        <p>Shipping and Handling: ${shipAndHand}</p>
        <p>Total before tax: ${totalBeforeTax}</p>
        <p>Estimated GST/HST: ${gstHst}</p>
        <p>Estimated PST/RST/QST: ${pstRstQst}</p>
        <p>Grand Total: ${grandTotal}</p>
      </Cost>
      <Link to="/products">
        <button>Continue Shopping</button>
      </Link>
    </Container>
  );
};

export default Confirmation;

const List = styled.li`
  width: 50%;
  padding: 0;
  margin: auto;
  text-align: left;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3%;

  span {
    font-weight: bolder;
  }

  h2 {
    padding: 10px 0;
  }

  div {
    display: flex;
    width: 20vw;
    justify-content: space-evenly;
    padding: 10px;
  }

  summary {
    border: 2px solid #ccc;
    display: flex;
    text-align: center;
    --summary-width: 50vw;
    padding: 0;
  }
  li:first-child {
    margin: auto;
    padding: 15px 0;
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
      height: 150px;
    }
  }

  button {
    margin: 15px 0 20px 0;
  }
`;

const Cost = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  gap: 10px;
  width: 43%;
  padding-top: 30px;
  line-height: 25px;

  p {
    /* padding-left: 43%; */
    text-align: left;
    width: 50vw;
  }
`;
