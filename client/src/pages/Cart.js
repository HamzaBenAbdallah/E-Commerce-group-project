import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../services/GlobalContext";
import ItemsInCart from "../components/itemsInCart";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const { cart, cartTotal } = useContext(GlobalContext);

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

        {!cartTotal ? (
          <div>{"Total:"}</div>
        ) : (
          <div className="total">
            <span>Total:</span>
            {cartTotal.toFixed(2)}
          </div>
        )}

        <NavLink to="/checkout">
          <button>Checkout</button>
        </NavLink>
      </CartWrapper>
    );
  } else {
    return (
      <CartWrapper>
        <table></table>
        <h1>No items in the cart</h1>
        <div></div>
      </CartWrapper>
    );
  }
};

export default Cart;

const CartWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0px 0px 3px 1px rgba(151, 151, 151, 0.53);
  a {
    text-decoration: none;
    color: inherit;
  }
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
