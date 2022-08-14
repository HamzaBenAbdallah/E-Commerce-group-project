import { useContext } from "react";
import { GlobalContext } from "../services/GlobalContext";
import { LandingPageContext } from "../services/LandingPageContext";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
const Front = () => {
  const { isLoading } = useContext(GlobalContext);
  const { productsInStock } = useContext(LandingPageContext);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Wrapper>
      <Image
        src="https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
        alt=""
      />
      <Info>
        <Title>Featured Products</Title>
        <Featured>
          {productsInStock.slice(0, 5).map((item, idx) => {
            return (
              <div key={idx}>
                <Card item={item} />
              </div>
            );
          })}
        </Featured>
        <Link to="/products">
          <Button>Browse all products</Button>
        </Link>
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  gap: 2rem;
  height: 100vh;
`;

const Image = styled.img`
  height: 75%;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 400;
  color: #5c5c5c;
`;

const Featured = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  width: 85%;
  margin: 2rem 0;
`;

const Link = styled(NavLink)`
  text-decoration: none;
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
  margin-bottom: 2rem;
  border-radius: 5px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export default Front;
