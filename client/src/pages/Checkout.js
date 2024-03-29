import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../services/GlobalContext";
import styled from "styled-components";
import Spinner from "../components/Spinner";

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
  const [loadingPurchase, setLoadingPurchase] = useState(false);
  const { getItems, cartTotal, setCart } = useContext(GlobalContext);
  const itemsList = Object.values(getItems);

  const server = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  const shipping = 15;
  const total = (cartTotal + shipping).toFixed(2);

  const handleChange = ({ currentTarget: input }) => {
    setFormData({
      ...formData,
      [input.name]: input.value,
    });
  };

  const items = JSON.parse(localStorage.getItem("cart"));
  let itemIds = [];
  items?.map((item) => {
    return itemIds.push(Object.keys(item)[0]);
  });

  useEffect(() => {
    const newState = [];
    setIsLoading(true);
    itemIds.map((id) => {
      itemsList.map((item) => {
        if (item._id == id) {
          items.map((itemInCart) => {
            if (Object.keys(itemInCart)[0] == id) {
              newState.push({
                ...item,
                quantity: Object.values(itemInCart)[0],
              });
            }
          });
        }
      });
    });
    setItemsData(newState);
    setIsLoading(false);
  }, [getItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingPurchase(true);
    const order = {
      formData,
      itemsData,
      total,
    };

    fetch(`${server}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order }),
    });

    setTimeout(() => {
      setFormData(initialState);
      localStorage.clear();
      setItemsData([]);
      setCart([]);
      navigate("/confirmation");
    }, 2000);
  };

  return (
    <Container>
      <Buyer onSubmit={handleSubmit}>
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
            type="email"
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
            type="number"
            placeholder="PHONE"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            required
          />
        </InfoContainer>
        <Button type="submit">
          {loadingPurchase ? (
            <Loading>
              <Spinner />
            </Loading>
          ) : (
            "CONTINUE TO PAYMENT"
          )}
        </Button>
      </Buyer>
      <Cart>
        <Items>
          {!isLoading &&
            itemsData?.map((item) => (
              <CartItem key={item._id}>
                <Image src={item.imageSrc} />
                <ItemTitle>{item.name}</ItemTitle>
                <Quantity>({item.quantity})</Quantity>
                <Price>
                  ${(Number(item.price.slice(1)) * item.quantity).toFixed(2)}
                </Price>
              </CartItem>
            ))}
        </Items>
        <Separator />
        <Payment>
          <PaymentItem>
            <PaymentTitle>SUBTOTAL</PaymentTitle>
            <Price>${Number(cartTotal.toFixed(2))}</Price>
          </PaymentItem>
          <PaymentItem>
            <PaymentTitle>SHIPPING</PaymentTitle>
            <Price>${shipping}</Price>
          </PaymentItem>
          <PaymentItem>
            <PaymentTitle>Total</PaymentTitle>
            <Price>${Number(total)}</Price>
          </PaymentItem>
        </Payment>
      </Cart>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 65%;
  height: 100%;
  margin: 3rem auto;
  font-family: sans-serif;
  gap: 3rem;
`;

const Buyer = styled.form`
  width: 55%;
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
  width: 45%;
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
  gap: 1.5rem;
`;

const CartItem = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Image = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
`;

const ItemTitle = styled.div`
  font-size: 0.9em;
  min-width: 18ch;
  line-height: 1.2em;
`;

const Quantity = styled.div`
  margin-left: auto;
`;

const Price = styled.div`
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
  width: 90%;
  outline: 1px solid gray;
  align-self: center;
`;

const Loading = styled.div`
  margin: auto;
  padding: 5px 0;
`;
export default Checkout;
