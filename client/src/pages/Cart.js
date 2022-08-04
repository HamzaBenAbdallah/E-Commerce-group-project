import React, { useContext}  from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { GlobalContext } from "../services/GlobalContext";

const Cart = () => {

  const { itemId } = useParams();
  const [item, setItem] = React.useState('');

  const { cart, addProduct } = useContext(GlobalContext)

  React.useEffect(() => {
    fetch(`/api/items/${itemId}`)
      .then((res) => res.json())
      .then((json) => {
        setItem(json);
      })
      .catch((err) => {
        console.error(err);
      });
      addProduct("1234", cart)
  }, []);

  React.useEffect(() => {
    fetch(`/api/purchase/`)
      .then((res) => res.json())
      .then((json) => {
        setItem(json);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
  <CartContent> <h2>Cart content</h2>
      <CartItemInformationWrapper> Wrapper for cart header and grid
      <form action="/cart" method="post">
            <TableComponent>
              <Thead>
                <tr class="product-row">
                  <th>product</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th class="remove-cell">Remove</th>
                  <th class="total-cel">Total</th>
                </tr>
              </Thead>
              <Tbody>
                <tr class="product-row">
                  {/* <td class="image-cell">Image of the product<a href="#"></a></td> */}
                  <ItemImage src={item.imageSrc} alt="Item image."></ItemImage>
                  {/* <td class="title-cell">Name of the product<a href="#"></a></td> */}
                  <ItemName>{item.name}</ItemName>
                  <td class="title-cell">Price $$$<a href="#"></a></td>
                  {/* <ItemPrice>{item.price}</ItemPrice> */}
                  <td class="qty-cell">quantity<a href="#">
                  {/* <ItemInStock>{item.numInStock}</ItemInStock> */}
                    <input type="number" name="updates[]" id="updates_product_ID"></input>
                    </a></td>
                 <td class="C__remove-cell" data-title="REMOVE?">
                  <span class="no-wrap">
                    <a  title="remove" href="/cart/change?line=1&amp;quantity=0">REMOVE</a>
                  </span>
                </td>
                </tr>
              </Tbody>
            </TableComponent>


          </form>
        <TotalContainer> 
          <h2>Total: $$$$</h2>
        </TotalContainer>
        <ButtonContainer>
          <CheckoutButton
            Onclick on button to redirect to the cart page
            onClick={() => {
              window.location.href = '/checkout';
            }}
          >
            Checkout
          </CheckoutButton>
          <UpdateButton
            Onclick on button to redirect checkout
            onClick={() => {
              window.location.href = '/cart';
            }}
          >
            Update
          </UpdateButton>
        </ButtonContainer>
        </CartItemInformationWrapper>
  </CartContent>
  )
};


const CartContent = styled.div`
    flex: 1;
    width: 100%;
    margin: 0 auto;
    border: solid yellow 2px;
    background-color: #e0e0e0;
    display: flex;
    flex-flow: row wrap;
    align-items: stretch;
    justify-content: space-around;
`;


const CartItemInformationWrapper = styled.div`
  border: blueviolet solid 4px;
  padding: 5vw;
  flex-direction: column;
  display: flex;
  width: 100%;
`;

const TotalContainer = styled.div`
  /* padding: 5%; */
  display: flex;
  justify-content: center;
  border: solid white 2px;
  width: 100%;
  color: white;
  border-width: 1px 0;
  padding: 10px;
  text-align: right;
  font-size: 160%;
`;


//stylling item in card

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  text-align: right;
  margin-bottom: 1em;
  border: solid black 2px;
`

const CheckoutButton = styled.button`
  background: black;
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5%;
`;

const UpdateButton = styled.button`
    background: black;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 10px 24px;
    display: inline-block;
    font-size: 16px;
    margin: 5%;
`;

const ItemImage = styled.img`
  width: 50%;
  height: 50%;
  margin: 5%;
`;

const ItemName = styled.h2`
  flex: 2;
  margin: 5%;
`;


// const CartContent = styled.div`
//     width: 100%;
//     margin: 0 auto;
//     display: flex;
//     /* flex: 0 0 100%; */
//     max-width: 100%;
//     padding: 5vw;
//     align-self: flex-start;
//     box-sizing: border-box;
//     font-size: 80%;
//     border: solid white 2px;
// `

const TableComponent = styled.table`
  border-collapse: collapse;
  width: 100%;
`

const Thead = styled.table`
    height: 70px;
    width: 80%;
    display: grid;
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: .1em;
    background: 0 0;
    padding: 1rem .5rem;
    font-weight: 700;
    text-align: left;
    border: solid white 2px;
    `

const Tbody = styled.table`
    height: 100%;
    width: 80%;
    display: grid;
    font-size: 10px;
    letter-spacing: .1em;
    background: 0 0;
    padding: 1rem .5rem;
    font-weight: 700;
    text-align: left;
    border: solid white 2px;

`

export default Cart;
