import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../services/GlobalContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import styled from "styled-components";


const Header = () => {
  const { cart, setCart } = useContext(GlobalContext);

  //this is to count how many items are in the cart
  const initialValue = 0;
  let itemsInCart;
  if (cart.length > 0) {
    itemsInCart = cart
      .map((item) => Object.values(item)[0])
      .reduce((a, b) => a + b, initialValue);
    ////////////

    console.log("itemsInCart", itemsInCart);
  //   return (
  //     <HeaderWrapper>
  //       <NavLink to="/">
  //         <h1>Our Super cool Store Name</h1>
  //       </NavLink>
  //       <NavLink to="/cart" className="cartDiv">
  //         <BsCart size="2em" />
  //         <span>{itemsInCart}</span>
  //       </NavLink>
  //     </HeaderWrapper>
  //   );
  // }

  // //IF there's no items in the cart then the counter is not displayed
  // else {
  //   return (
  //     <HeaderWrapper>
  //       <NavLink to="/">
  //         <h1>Our Super cool Store Name</h1>
  //       </NavLink>
  //       <NavLink to="/cart" className="cartDiv">
  //         <BsCart size="2em" />
  //         <span></span>
  //       </NavLink>
  //     </HeaderWrapper>
  //   );
  // }

  return (
    <Wrapper>
      <Container>
        <Link to="/">
          <Title>Our Super cool Store Name</Title>
        </Link>
        <Link to="/products">
          <Item>Products</Item>
        </Link>
      </Container>
      <Container>
        <Icon>
          <Link to="/">
            <MdOutlineAccountCircle size="1.5em" />
          </Link>
        </Icon>
        <Icon>
          <Link to="/cart">
            <AiOutlineShoppingCart size="1.5em" />
            <span>{cart.length}</span>
          </Link>
        </Icon>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: sans-serif;
  border-bottom: 2px solid #ccc;
`;

const Link = styled(NavLink)`
  color: inherit; //blue colors for links too
  text-decoration: inherit; /* no underline */
`;

const Title = styled.h1`
  padding: 0 6rem 0 2rem;
  font-size: 2.5em;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Item = styled.h3`
  &:hover {
    border-bottom: 2px solid #ccc;
  }
`;

const Icon = styled.div`
  display: flex;
  width: 5rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  border-left: 2px solid #ccc;
`;

export default Header
