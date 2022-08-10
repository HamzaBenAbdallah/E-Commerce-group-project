import { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../services/GlobalContext";
import styled from "styled-components";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  address: "",
  apt: "",
  city: "",
  province: "",
  postal: "",
  phone: "",
};

const Checkout = () => {
  const [formData, setFormData] = useState(initialState);
  const [itemsData, setItemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getItems } = useContext(GlobalContext);

  const handleChange = ({ currentTarget: input }) => {
    setFormData({
      ...formData,
      [input.name]: input.value,
    });
  };

  // Get items from localStorage and extract the ids of the items
  const items = JSON.parse(localStorage.getItem("cart"));
  let itemIds = [];
  items?.map((item) => {
    itemIds.push(Object.keys(item)[0]);
  });

  const itemsArray = Object.values(getItems);

  useEffect(() => {
    // const newState = [];
    // setIsLoading(true);
    itemIds.map((id) => {
      itemsArray.map((item) => {
        if (item._id == id) {
          console.log("item", item);
        }
      });
    });
    // setIsLoading(false);
    // setItemsData(newState);
  }, [getItems]);

  // const fetchItems = async (id) => {
  //   const response = await fetch(`/get-item/${id}`);
  //   const data = await response.json();
  //   return data.item;
  // };
  // // get items from the db using the ids
  // const fetchItemsData = async () => {
  //   const items = await Promise.all(itemIds.map((id) => fetchItems(id)));
  //   setItemsData(items);
  // };

  // fetchItemsData();
  // // Add the quantity of the items to each object in the itemsData array
  // const newState = itemsData.map((itemData) => {
  //   items.map((item) => {
  //     if (itemData._id == Object.keys(item)[0]) {
  //       return (itemData.quantity = Object.values(item)[0]);
  //     }
  //     return itemData;
  //   });
  // });

  // setItemsData(newState);

  return (
    <Container>
      <Buyer>
        <InfoContainer>
          <Title>CONTACT INFORMATION</Title>
          <InputContainer>
            <Input
              type="text"
              placeholder="FIRST NAME"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              required
            />
            <Input
              type="text"
              placeholder="LAST NAME"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              required
            />
          </InputContainer>
          <Input
            type="text"
            placeholder="EMAIL"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </InfoContainer>
        <InfoContainer>
          <Title>SHIPPING ADDRESS</Title>
          <Input
            type="text"
            placeholder="COUNTRY"
            name="country"
            onChange={handleChange}
            value={formData.country}
            required
          />
          <Input
            type="text"
            placeholder="ADDRESS"
            name="address"
            onChange={handleChange}
            value={formData.address}
            required
          />
          <Input
            type="text"
            placeholder="APT/SUITE"
            name="apt"
            onChange={handleChange}
            value={formData.apt}
            required
          />
          <InputContainer>
            <Input
              type="text"
              placeholder="CITY"
              name="city"
              onChange={handleChange}
              value={formData.city}
              required
            />
            <Input
              type="text"
              placeholder="PROVINCE"
              name="province"
              onChange={handleChange}
              value={formData.province}
              required
            />
            <Input
              type="text"
              placeholder="POSTAL CODE"
              name="postal"
              onChange={handleChange}
              value={formData.postal}
              required
            />
          </InputContainer>
          <Input
            type="text"
            placeholder="PHONE"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            required
          />
        </InfoContainer>
        <Button>CONTINUE TO PAYMENT</Button>
      </Buyer>
      <Cart>
        <Items>
          {/* {!isLoading &&
            itemsData?.map((item) => (
              <CartItem key={item._id}>
                <Image src={item.imageSrc} />
                <ItemTitle>{item.name}</ItemTitle>
                <Price>${Number(item.price.slice(1))}</Price>
              </CartItem>
            ))} */}
        </Items>
        <Separator />
        <Payment>
          <PaymentItem>
            <PaymentTitle>SUBTOTAL</PaymentTitle>
            <Price>40$</Price>
          </PaymentItem>
          <PaymentItem>
            <PaymentTitle>SHIPPING</PaymentTitle>
            <Price>15$</Price>
          </PaymentItem>
          <PaymentItem>
            <PaymentTitle>Total</PaymentTitle>
            <Price>55$</Price>
          </PaymentItem>
        </Payment>
      </Cart>
    </Container>
  );
};

/** Styling */

const Container = styled.div`
  display: flex;
  width: 65%;
  height: 100%;
  margin: 3rem auto;
  font-family: sans-serif;
  gap: 3rem;
`;

const Buyer = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  outline: 1px solid black;
  width: 100%;
  height: 4rem;
  padding: 0 1rem;
  text-transform: uppercase;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Title = styled.h3`
  font-size: 2em;
  letter-spacing: 1.25px;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  background-color: black;
  color: white;
  height: 3rem;
  width: 15rem;
  text-align: center;
  margin: 0 auto;
`;

const Cart = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 1.5em;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const CartItem = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  margin-right: 1.5rem;
`;

const ItemTitle = styled.div`
  font-size: 0.9em;
`;

const Price = styled.p`
  margin-left: auto;
`;

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentItem = styled.div`
  display: flex;
`;

const PaymentTitle = styled.div``;

const Separator = styled.div`
  width: 80%;
  outline: 1px solid gray;
  align-self: center;
`;

export default Checkout;
