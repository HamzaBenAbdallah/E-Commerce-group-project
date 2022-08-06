import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const Card = ({ item, itemCategory }) => {
  // const navigate = useNavigate();

  // const handleRedirection = (e) => {
  //   let childElem = e.target.parentNode.getAttribute("id");
  //   let parentWrapper = e.target.id;
  //   if (childElem !== null || (childElem !== "" && parentWrapper.length < 1)) {
  //     navigate(`/products/${childElem}`);
  //   } else if (
  //     parentWrapper !== null ||
  //     (parentWrapper !== "" && childElem.length < 1)
  //   ) {
  //     navigate(`/products/${parentWrapper}`);
  //   }
  // };

  return (
    <NavLink
      id={item.itemID}
      to={`/products/${item.itemID}`}
      changeOpacity={item?.numInStock ? 0 : 1}
      quantity={item?.numInStock ? 0 : 1}
      // onClick={handleRedirection}
    >
      <Leftover>
        {item?.numInStock > 0 && item?.numInStock < 4 && (
          <p>Only {item?.numInStock} left!</p>
        )}
      </Leftover>
      <Stock>{item?.numInStock < 1 && <p>Sold Out!</p>}</Stock>
      <Image src={`${item?.imageSrc}`} alt="item_image" />
      <Separator />
      <Info>
        <Name>{item.name}</Name>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
          doloremque impedit blanditiis cum praesentium voluptatem quo
          consequuntur et ducimus. Non!
        </Description>
      </Info>
      <Separator />
      <Shopping>
        <Price>{item.price}</Price>
        <Purchase>+ Add to cart</Purchase>
      </Shopping>
    </NavLink>
  );
};

const NavLink = styled(Link)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  min-width: 250px;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.3);
  line-height: 1.25rem;
  font-family: sans-serif;
  transition: transform 0.25s ease-in-out;
  opacity: ${(props) => (props.changeOpacity ? 0.2 : 1)};
  pointer-events: ${(props) => (props.quantity ? "none" : "")};

  &:hover {
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.8);
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  background-color: #f5f6f7;
`;

const Name = styled.p`
  width: 28ch;
  text-align: center;
  font-weight: 600;
  /** The title will on show 2 lines */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Description = styled.p`
  padding: 0 0.5rem;
`;

const Shopping = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  width: 100%;
  height: 2rem;
  margin-top: 1rem;
`;

const Price = styled.div``;

const Purchase = styled.div``;

const Separator = styled.div`
  width: 100%;
  outline: 1px solid rgba(0, 0, 0, 0.3);
`;

const Leftover = styled.div`
  color: red;
  font-weight: bolder;
`;

const Stock = styled.div`
  color: black;
  font-weight: bolder;
`;

export default Card;
