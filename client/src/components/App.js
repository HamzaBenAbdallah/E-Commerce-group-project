import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";
import Header from "./Header";
import Front from "../pages/Front";
import Landing from "../pages/Landing";
import ProductDescription from "../pages/ProductDescription";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Header />
        <Main>
          <Routes>
            <Route exact path="/" element={<Front />} />
            <Route exact path="/products" element={<Landing />} />
            <Route
              path="/products/:product_id"
              element={<ProductDescription />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Main>
      </Router>
    </>
  );
}

const Main = styled.main`
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default App;
