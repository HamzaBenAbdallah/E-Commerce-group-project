import React from "react";
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [getItems, setGetItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addProductToCart = async (id, event) => {
    event.preventDefault();
    let itemsObject = { [id]: 1 };
    if (cart.filter((item) => item[id]).length > 0) {
      let indexOfItem = await cart.findIndex((item) => item[id]);
      setCart([...cart], (cart[indexOfItem][id] += 1));
      return localStorage.setItem("cart", JSON.stringify([...cart]));
    } else if (cart.filter((item) => item[id]).length === 0) {
      console.log("222222");
      await setCart([...cart, itemsObject]);
      return localStorage.setItem(
        "cart",
        JSON.stringify([...cart, itemsObject])
      );
    }
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

  useEffect(() => {
    setIsLoading(true);
    fetch("/get-items")
      .then((res) => res.json())
      .then((itemData) => {
        return setGetItems(itemData.items);
      });
    setIsLoading(false);
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
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
