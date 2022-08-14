import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../services/GlobalContext";
import { Link } from "react-router-dom";

const Confirmation = () => {
  const [customerData, setCustomerData] = useState([]);
  const [boughtItem, setBoughtItem] = useState([]);
  const [subCost, setSubCost] = useState();

  const items = JSON.parse(localStorage.getItem("cart"));

  // console.log(`items:`, items.length);
  useEffect(() => {
    fetch("/confirmed-purchased")
      .then((res) => res.json())
      .then((customer) => {
        setCustomerData(
          customer.customerData[customer.customerData.length - 1]?.formData
        );
        setBoughtItem(
          customer.customerData[customer.customerData.length - 1]?.itemsData
        );
        setSubCost(
          Number(customer.customerData[customer.customerData.length - 1]?.total)
        );
      });
  }, []);

  console.log(`boughtItem:`, boughtItem.length);

  const totalBeforeTax = Number((subCost - 15).toFixed(2));
  const gstHst = Number((subCost * 0.05).toFixed(2));
  const pstRstQst = Number((subCost * 0.09975).toFixed(2));
  const grandTotal = (subCost + gstHst + pstRstQst).toFixed(2);

  return (
    <Container>
      {boughtItem.length > 0 ? (
        <>
          <h1>Your order is on it's way!</h1>
          <span>
            Once we ship your order you will receive an email with the shipping
            details.
          </span>

          <h2>Order summary</h2>

          <div>
            <p>Name: {customerData.firstName}</p>
            {customerData?.apt ? (
              <p>
                Shipping Address: {customerData.apt}-{customerData.address}
              </p>
            ) : (
              <p>Shipping Address: {customerData.address}</p>
            )}
          </div>
          <ol>
            {boughtItem.map((purchase) => {
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
            <p>Item(s) subtotal: ${totalBeforeTax}</p>
            <p>Shipping and Handling: $15</p>
            <p>Total before tax: ${subCost}</p>
            <p>Estimated GST/HST: ${gstHst}</p>
            <p>Estimated PST/RST/QST: ${pstRstQst}</p>
            <p>Grand Total: ${grandTotal}</p>
          </Cost>
          <Link to="/products">
            <button>Continue Shopping</button>
          </Link>
        </>
      ) : (
        <Empty>No Purchases Made</Empty>
      )}
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

const Empty = styled.h1`
  padding-top: 25vh;
`;
