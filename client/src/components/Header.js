import { BsCart } from "react-icons/bs";
import styled from "styled-components";
import { useState, useContext } from "react";
import { GlobalContext } from "../services/GlobalContext";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { cart, setCart } = useContext(GlobalContext);
  // console.log(cart);
  // const [itemsInCart, setItemsInCart] = useState(0);
  return (
    <HeaderWrapper>
      <NavLink to="/">
        <h1>Our Super cool Store Name</h1>
      </NavLink>
      <NavLink to="/cart" className="cartDiv">
        <BsCart size="2em" />
        <span>{cart.length}</span>
      </NavLink>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
  }
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 30px;
    margin-left: 10px;
  }
  .cartDiv {
    margin-right: 25px;
  }
`;
