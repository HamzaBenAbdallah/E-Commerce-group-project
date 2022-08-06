import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../services/GlobalContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import styled from "styled-components";

const Header = () => {
  const { cart } = useContext(GlobalContext);
  return (
    <Wrapper>
      <Link to="/">
        <Title>Our Super cool Store Name</Title>
      </Link>
      <Icons>
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
      </Icons>
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
  padding: 0 2rem;
  font-size: 2rem;
`;

const Icons = styled.div`
  display: flex;
`;

const Icon = styled.div`
  display: flex;
  width: 5rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  border-left: 2px solid #ccc;
`;

export default Header;
