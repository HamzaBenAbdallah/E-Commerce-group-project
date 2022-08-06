import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import { GlobalContext } from "../services/GlobalContext";
import ItemsInCart from "../components/itemsInCart";

const Cart = () => {
  const { cart } = useContext(GlobalContext);

  console.log("cart", cart);

  if (cart.length > 0) {
    return (
      <CartWrapper>
        <table>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>remove</th>
            <th>Total</th>
          </tr>

          {cart.map((object, index) => {
            let ids = Object.keys(object);

            return (
              <ItemsInCart
                key={`item ${index}`}
                currentItem={object}
                index={index}
                id={parseInt(ids[0])}
              />
            );
          })}
        </table>
        <div>Total:1200</div>

        <div>
          <button>checkout</button>
        </div>
      </CartWrapper>
    );
  } else {
    return (
      <CartWrapper>
        <table>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>remove</th>
            <th>Total</th>
          </tr>

          <h1>No items in the cart</h1>
          <div>Total:1200</div>
          <div>
            <button>checkout</button>
          </div>
        </table>
      </CartWrapper>
    );
  }
};

export default Cart;

const CartWrapper = styled.div`
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  * {
    margin: 2.5px;
  }
  table {
    border-bottom: solid 1px black;
  }

  tr {
    border-bottom: solid 1px black;
  }
`;
