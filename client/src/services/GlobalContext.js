import React from "react";
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [getItems, setGetItems] = useState([]);
  const [getCompany, setGetCompany] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const addProductToCart = async (
    id,
    event,
    quantityToAdd,
    productInformation
  ) => {
    event.preventDefault();
    let itemsObject = { [id]: quantityToAdd };
    if (cart.filter((item) => item[id]).length > 0) {
      let indexOfItem = await cart.findIndex((item) => item[id]);
      await setCart([...cart], (cart[indexOfItem][id] += quantityToAdd));
      let totalAmountOfmoney =
        quantityToAdd * Number(productInformation.price.substr(1));
      setCartTotal((prevCartTotal) => prevCartTotal + totalAmountOfmoney);
      return localStorage.setItem("cart", JSON.stringify([...cart]));
    } else if (cart.filter((item) => item[id]).length === 0) {
      await setCart([...cart, itemsObject]);

      let totalAmountOfmoney =
        quantityToAdd * Number(productInformation.price.substr(1));
      setCartTotal((prevCartTotal) => prevCartTotal + totalAmountOfmoney);
      return localStorage.setItem(
        "cart",
        JSON.stringify([...cart, itemsObject])
      );
    }
  };
  console.log("cartTotal", cartTotal);
  const removeItemFromCart = (event, id) => {
    event.preventDefault();
    const newArrayWithoutSelectedId = cart.filter((object) => !object[id]);
    setCart([...newArrayWithoutSelectedId]);
    return localStorage.setItem(
      "cart",
      JSON.stringify([...newArrayWithoutSelectedId])
    );
  };

  const increaseQuantityInCart = async (event, id) => {
    let indexOfItemToIncrease = await cart.findIndex((item) => item[id]);
    setCart([...cart], (cart[indexOfItemToIncrease][id] += 1));
    console.log("increased");
  };

  const decreaseQuantityInCart = async (event, id) => {
    let indexOfItemToDecrease = await cart.findIndex((item) => item[id]);
    setCart([...cart], (cart[indexOfItemToDecrease][id] -= 1));
    console.log("decreased");
  };

  //This function runs every time the cart changes to find if we wanted to remove an item from our cart
  const chekCartForEmptyItems = () => {
    let idsOfItemsInCart = cart.map((object) => Object.keys(object));
    for (let i = 0; i < cart.length; i++) {
      if (cart[i][parseInt(idsOfItemsInCart[i])] < 1) {
        let copyOfCart = [...cart];
        copyOfCart.splice(i, 1);
        setCart([...copyOfCart]);
        localStorage.setItem("cart", JSON.stringify([...copyOfCart]));
        return console.log("deleted", cart[i]);
      }
    }
  };

  //check cart to find items in local storage
  const checkCart = async () => {
    let cart = await localStorage.getItem("cart");
    if (cart === null) {
      const newCart = [];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return;
    } else {
      const newCart = await JSON.parse(cart);
      setCart(newCart);
      return;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("/get-items")
      .then((res) => res.json())
      .then((itemData) => {
        return setGetItems(itemData.items);
      });
    setIsLoading(false);
  }, []);

  //Sets the cart on the first mount to see if the item contains something in local storage
  useEffect(() => {
    setIsLoading(true);
    fetch("/get-companies")
      .then((res) => res.json())
      .then((companies) => {
        return setGetCompany(companies.data);
      });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkCart();
  }, []);
  //

  //This function runs every time the cart changes to find if we wanted to remove an item from our cart
  useEffect(() => {
    chekCartForEmptyItems();
  }, [cart]);

  console.log("cart", cart);

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        getItems,
        getCompany,
        addProductToCart,
        isLoading,
        removeItemFromCart,
        increaseQuantityInCart,
        decreaseQuantityInCart,
        cartTotal,
        setCartTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
