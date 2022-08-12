import styled from "styled-components";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../services/GlobalContext";

const ProductDescription = () => {
  const { cart, setCart, addProductToCart } = useContext(GlobalContext);
  const [productInformation, setProductInformation] = useState();
  const [quantityToAdd, setQuantityToAdd] = useState(1);

  let { product_id } = useParams();
  product_id = parseInt(product_id);

  useEffect(() => {
    fetch(`/products/${product_id}`)
      .then((response) => response.json())
      .then((data) => setProductInformation(data.data[0]));
  }, [cart]);

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
              <span className="productId">{`Product #: ${productInformation._id}`}</span>
              <h3 className="price">{productInformation.price}</h3>
            </div>

            <div className="quantity-selector">
              {quantityToAdd <= 1 ? (
                <button
                  disabled
                  onClick={() =>
                    setQuantityToAdd(
                      (prevQuantityToAdd) => prevQuantityToAdd - 1
                    )
                  }
                >
                  -
                </button>
              ) : (
                <button
                  onClick={() =>
                    setQuantityToAdd(
                      (prevQuantityToAdd) => prevQuantityToAdd - 1
                    )
                  }
                >
                  -
                </button>
              )}
              <span>{quantityToAdd}</span>

              <button
                onClick={() =>
                  setQuantityToAdd((prevQuantityToAdd) => prevQuantityToAdd + 1)
                }
              >
                +
              </button>
            </div>

            <button
              onClick={(event) =>
                addProductToCart(
                  product_id,
                  event,
                  quantityToAdd,
                  productInformation
                )
              }
            >
              Add to cart
            </button>
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
    width: 100%;
    border: none;
    padding: 10px 0;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }

  .quantity-selector button {
    width: 30px;
  }

  .imageWrapper {
    margin: 50px;
    width: 400px;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    img {
      width: 80%;
      border-radius: 5px;
    }
  }
  .infoWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 400px;
    height: 380px;
    border-radius: 5px;
    .productId {
      margin: 0;
    }
    .price {
      margin-top: 20px;
      font-size: 1.5em;
    }
    h2 {
      margin: 5px 0 5px 0;
      font-size: 1.5em;
    }
    h3 {
      padding: 0;
      margin: 0;
    }
  }
  .infoWrapper > * {
    background-color: #efefef;
  }

  .productInfoDiv {
    border: 1px solid black;
    margin: 5px;
    border-radius: 5px;
    padding: 5px;

    h2 {
      margin: 10px 0 10px 0;
    }
  }

  .quantity-selector {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 20px 0 38px 0;
  }

  .pricing_stock {
  }
`;
