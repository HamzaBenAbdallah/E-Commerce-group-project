import styled from "styled-components";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDescription = () => {
  const [productInformation, setProductInformation] = useState();
  let { product_id } = useParams();
  product_id = parseInt(product_id);

  useEffect(() => {
    fetch(`/products/${product_id}`)
      .then((response) => response.json())
      .then((data) => setProductInformation(data.data[0]));
  }, []);
  console.log("productInformation", productInformation);
  return (
    <>
      {productInformation ? (
        <Wrapper>
          <div className="imageWrapper">
            <img
              src={productInformation.imageSrc}
              alt={`product #${product_id} profile `}
            ></img>
          </div>
          <div className="infoWrapper">
            <div className="productInfoDiv">
              <span>{productInformation.category}</span>
              <h2>{productInformation.name}</h2>
              <span>{`Product #: ${productInformation._id}`}</span>
            </div>
            <div className="pricing_stock">
              <h3>{productInformation.price}</h3>
            </div>
            <button>Add to cart</button>
          </div>
        </Wrapper>
      ) : (
        <Wrapper>
          <h1>Loading</h1>
        </Wrapper>
      )}
    </>
  );
};

export default ProductDescription;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: solid 1px black;
  button {
    text-align: left;
    width: 30%;
    margin-top: 30px;
  }

  .imageWrapper {
    border: 1px solid black;
    margin: 50px;
    width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
    }
  }
  .infoWrapper {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 400px;
    h2 {
      margin: 5px 0 20px 0;
    }
    h3 {
      padding: 0;
      margin: 0;
    }
  }
  .infoWrapper > * {
    background-color: aliceblue;
  }

  .productInfoDiv {
    border: 1px solid black;
    margin: 5px;
  }

  .pricing_stock {
    margin-top: 40px;
  }
`;
