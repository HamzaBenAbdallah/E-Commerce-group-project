import { useEffect, useState } from "react";
import styled from "styled-components";

const ItemsInCart = ({ currentItem, index, id }) => {
  const [itemInformation, setItemInformation] = useState();

  useEffect(() => {
    fetch(`/products/${id}`)
      .then((response) => response.json())
      .then((data) => setItemInformation(data.data[0]));
  }, []);

  console.log(currentItem, index, id);
  console.log("ZAZAZAZA", itemInformation);

  if (itemInformation) {
    let price = Number(itemInformation.price.substring(1));
    console.log(price);
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
          {" "}
          <span className="quantity">{currentItem[id]}</span>
        </td>
        <td>
          {" "}
          <button>Remove</button>
        </td>
        <td>
          {" "}
          <span>{price * currentItem[id]}</span>
        </td>
      </tr>
    );
  } else {
    return <ProductWrapper>Loading</ProductWrapper>;
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
