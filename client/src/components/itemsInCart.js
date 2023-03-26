import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../services/GlobalContext";

const ItemsInCart = ({ currentItem, id }) => {
  const server = process.env.REACT_APP_SERVER_URL;

  const {
    cart,
    removeItemFromCart,
    increaseQuantityInCart,
    decreaseQuantityInCart,
  } = useContext(GlobalContext);
  const [itemInformation, setItemInformation] = useState();

  useEffect(() => {
    fetch(`${server}/products/${id}`)
      .then((response) => response.json())
      .then((data) => setItemInformation(data.data[0]));
  }, [cart, id]);

  if (itemInformation) {
    let price = Number(itemInformation.price.substring(1));
    let quantity = currentItem[id];

    return (
      <tr>
        <td>
          {" "}
          <NavLink to={`/products/${id}`}>
            <img src={itemInformation.imageSrc} alt="item"></img>
          </NavLink>
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
          {quantity >= itemInformation.numInStock ? (
            <button
              disabled
              onClick={(event) => increaseQuantityInCart(event, id)}
            >
              +
            </button>
          ) : (
            <button onClick={(event) => increaseQuantityInCart(event, id)}>
              +
            </button>
          )}
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
