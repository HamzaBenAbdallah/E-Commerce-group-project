import styled from "styled-components";

const Checkout = () => {
  return (
    <Container>
      <Buyer>
        <InfoContainer>
          <Title>CONTACT INFORMATION</Title>
          <InputContainer>
            <Input type="text" placeholder="FIRST NAME" />
            <Input type="text" placeholder="LAST NAME" />
          </InputContainer>
          <Input type="text" placeholder="EMAIL" />
        </InfoContainer>
        <InfoContainer>
          <Title>SHIPPING ADDRESS</Title>
          <Input type="text" placeholder="COUNTRY" />
          <Input type="text" placeholder="ADDRESS" />
          <Input type="text" placeholder="APT/SUITE" />
          <InputContainer>
            <Input type="text" placeholder="CITY" />
            <Input type="text" placeholder="PROVINCE" />
            <Input type="text" placeholder="POSTAL CODE" />
          </InputContainer>
          <Input type="text" placeholder="PHONE" />
        </InfoContainer>
        <Button>CONTINUE TO PAYMENT</Button>
      </Buyer>
      <Cart>
        <Items>
          <CartItem>
            <Image src="https://randomuser.me/api/portraits/med/men/75.jpg" />
            <ItemTitle>man</ItemTitle>
            <Price>$20.00</Price>
          </CartItem>
          <CartItem>
            <Image src="https://randomuser.me/api/portraits/med/women/31.jpg" />
            <ItemTitle>woman</ItemTitle>
            <Price>$20.00</Price>
          </CartItem>
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

const ItemTitle = styled.h4`
  letter-spacing: 1.25px;
  font-weight: 400;
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
