import React from "react";
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [getItems, setGetItems] = useState([]);

  const addProductToCart = (id, event) => {
    event.preventDefault();
    let itemsArray = [];
    itemsArray.push(id);
    setCart((current) => [...current, ...itemsArray]);
    console.log("submited to localstorage");
    localStorage.setItem("cart", JSON.stringify([...cart, ...itemsArray]));
  };

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

  // const addProduct = async (id, cart) => {
  //   console.log("this is running");
  //   console.log(cart);
  //   if (cart.length === 0) {
  //     const newItem = [id, 1];
  //     // console.log(cart)
  //     // let newCart = cart.push(newItem)
  //     // console.log(newCart)
  //     setCart(cart);
  //   }
  // };

  useEffect(() => {
    fetch("/get-items")
      .then((res) => res.json())
      .then((itemData) => {
        return setGetItems(itemData.items);
      });
  }, []);

  useEffect(() => {
    checkCart();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        getItems,
        addProductToCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
