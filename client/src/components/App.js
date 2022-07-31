import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import Landing from "../pages/Landing";
import ProductDescription from "../pages/ProductDescription";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

function App() {
  return (
    <Router>
      <Header />
      <Main>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/products/:id" component={ProductDescription} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
}

const Main = styled.main`
  background: red;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default App;
