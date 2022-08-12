import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../services/GlobalContext";

const ItemsInCart = ({ currentItem, index, id }) => {
  const {
    cart,
    setCart,
    removeItemFromCart,
    increaseQuantityInCart,
    decreaseQuantityInCart,
  } = useContext(GlobalContext);
  const [itemInformation, setItemInformation] = useState();

  useEffect(() => {
    fetch(`/products/${id}`)
      .then((response) => response.json())
      .then((data) => setItemInformation(data.data[0]));
  }, [cart]);

  if (itemInformation) {
    let price = Number(itemInformation.price.substring(1));
    let quantity = currentItem[id];
    // price = price.toFixed(2);

    return (
      <tr>
        <td>
          {" "}
          <img src={itemInformation.imageSrc}></img>
        </td>
        <td>
          {" "}
          <span>{itemInformation.name}</span>
        </td>
        <td>
          {" "}
          <span>{itemInformation.price}</span>
        </td>
        <td>
          <button onClick={(event) => increaseQuantityInCart(event, id)}>
            +
          </button>
          <label>{currentItem[id]}</label>
          <button onClick={(event) => decreaseQuantityInCart(event, id)}>
            -
          </button>
        </td>
        <td>
          {" "}
          <button
            onClick={(event) => {
              removeItemFromCart(event, itemInformation._id);
            }}
          >
            Remove
          </button>
        </td>
        <td>
          {" "}
          <span>{Number((price * quantity).toFixed(2))}</span>
        </td>
      </tr>
    );
  } else {
    return <>Loading</>;
  }
};

export default ItemsInCart;
const ProductWrapper = styled.div`
  width: 100vw;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;

  img {
    width: 80px;
    height: 80px;
  }

  button {
    height: 20px;
  }

  .quantity {
    text-align: center;
  }
`;
