import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../services/GlobalContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LandingPageContext } from "../services/LandingPageContext";
import styled from "styled-components";

const Header = () => {
  const { cart, setCart } = useContext(GlobalContext);

  const { uniqueCategories, handleClick } = useContext(LandingPageContext);

  // this is to count how many items are in the cart
  const initialValue = 0;
  let itemsInCart;
  if (cart.length > 0) {
    itemsInCart = cart
      .map((item) => Object.values(item)[0])
      .reduce((a, b) => a + b, initialValue);
  }

  return (
    <Wrapper>
      <Container>
        <Link to="/">
          <Title>Our Super cool Store Name</Title>
        </Link>
        <Menu>
          <Link to="/products">
            <Item>Products</Item>
          </Link>
        </Menu>
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
            <span>{itemsInCart}</span>
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
  --height: 80px;
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
  font-size: 1.2rem;
  cursor: pointer;
  border-bottom: 2px solid white;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: var(--height);
`;

const Icon = styled.div`
  display: flex;
  width: 5rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  border-left: 2px solid #ccc;
`;

const Menu = styled.div`
  &:hover,
  ${Item}:hover {
    text-decoration: underline;
    text-decoration-color: #ccc;
    text-decoration-thickness: 2px;
    text-underline-offset: 10px;
  }

  ol {
    position: absolute;
    border: 2px solid #ccc;
    background-color: white;
    width: 180px;
    margin: 0;
    cursor: pointer;
    display: none;

    li {
      background-color: white;
      padding: 12px 17px;

      &:hover {
        background-color: #ccc;
        font-weight: bolder;
      }
    }
  }

  &:hover,
  ol:hover {
    ol {
      display: block;
    }
  }
`;
export default Header;
