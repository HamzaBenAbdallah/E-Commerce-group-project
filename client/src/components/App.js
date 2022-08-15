import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";
import Header from "./Header";
import Front from "../pages/Front";
import Products from "../pages/Products";
import ProductDescription from "../pages/ProductDescription";
import Cart from "../pages/Cart";
import Confirmation from "../pages/Confirmation";
import Checkout from "../pages/Checkout";
import React, { useContext } from "react";
import { GlobalContext } from "../services/GlobalContext";

function App() {
  const { cart } = useContext(GlobalContext);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Header />
        <Main>
          <Routes>
            <Route exact path="/" element={<Front />} />
            <Route exact path="/products" element={<Products />} />
            <Route
              path="/products/:product_id"
              element={<ProductDescription />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
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
