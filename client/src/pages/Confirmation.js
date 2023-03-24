import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Spinner from "../components/Spinner";

const Confirmation = () => {
  const [customerData, setCustomerData] = useState([]);
  const [boughtItem, setBoughtItem] = useState([]);
  const [subCost, setSubCost] = useState();
  const [loadingItems, setLoadingItems] = useState(false);

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
        setLoadingItems(true);
      });
  }, []);

  const totalBeforeTax = Number((subCost - 15).toFixed(2));
  const gstHst = Number((subCost * 0.05).toFixed(2));
  const pstRstQst = Number((subCost * 0.09975).toFixed(2));
  const grandTotal = (subCost + gstHst + pstRstQst).toFixed(2);

  return (
    <Container>
      {loadingItems ? (
        <>
          {boughtItem.length >= 1 ? (
            <>
              <h1>Your order is on it's way!</h1>
              <span>
                Once we ship your order you will receive an email with the
                shipping details.
              </span>

              <h2>Order summary:</h2>

              <div>
                <p>
                  <span>Name:</span> {customerData.firstName}
                </p>
                {customerData?.apt ? (
                  <p>
                    <span>Shipping Address:</span> {customerData.apt}-
                    {customerData.address}
                  </p>
                ) : (
                  <p>
                    <span>Shipping Address:</span> {customerData.address}
                  </p>
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
                <p>
                  <span>Item(s) subtotal:</span> ${totalBeforeTax}
                </p>
                <p>
                  <span>Shipping and Handling:</span> $15
                </p>
                <p>
                  <span>Total before tax:</span> ${subCost}
                </p>
                <p>
                  <span>Estimated GST/HST:</span> ${gstHst}
                </p>
                <p>
                  <span>Estimated PST/RST/QST:</span> ${pstRstQst}
                </p>
                <p>
                  <span>Grand Total:</span> ${grandTotal}
                </p>
              </Cost>
              <Link to="/products">
                <button>Continue Shopping</button>
              </Link>
            </>
          ) : (
            <Empty>No Purchases Made</Empty>
          )}
        </>
      ) : (
        <Loading>
          <Spinner />
        </Loading>
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
    padding: 40px 0 10px 0;
    font-size: 1.2rem;
    text-decoration-line: underline;
  }

  div {
    display: flex;
    width: 20vw;
    justify-content: space-evenly;
    padding: 10px;
  }

  summary {
    border: 2px solid #ccc;
    border-radius: 10px;
    display: flex;
    text-align: center;
    --summary-width: 50vw;
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
    padding: 15px;
    img {
      height: 150px;
    }
  }

  button {
    margin: 15px 0 30px 0;
    background-color: #2a4991;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 5px;
    padding: 15px 20px;
    border: none;
  }
`;

const Cost = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  gap: 20px;
  width: 43%;
  padding-top: 30px;
  line-height: 25px;
  padding-bottom: 20px;

  p {
    text-align: left;
    width: 50vw;
  }
`;

const Loading = styled.div`
  margin-top: 150px;
`;

const Empty = styled.h1`
  padding-top: 25vh;
`;
