import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import Landing from "../pages/Landing";
import ProductDescription from "../pages/ProductDescription";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import GlobalStyles from "../GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Header />
        <Main>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route
              path="/products/:product_id"
              element={<ProductDescription />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Main>
        <Footer />
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
