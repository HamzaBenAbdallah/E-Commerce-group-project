import React from "react";
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [getItems, setGetItems] = useState([]);
  const [getCompany, setGetCompany] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const addProductToCart = async (id, event, quantityToAdd) => {
    event.preventDefault();
    console.log("quantityToAdd", quantityToAdd);
    let itemsObject = { [id]: quantityToAdd };
    if (cart.filter((item) => item[id]).length > 0) {
      let indexOfItem = await cart.findIndex((item) => item[id]);
      setCart([...cart], (cart[indexOfItem][id] += quantityToAdd));
      console.log("cart", cart);
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

  const removeItemFromCart = (event, _id) => {
    event.preventDefault();
    const newArrayWithoutSelectedId = cart.filter((object) => !object[_id]);
    setCart([...newArrayWithoutSelectedId]);
    return localStorage.setItem(
      "cart",
      JSON.stringify([...newArrayWithoutSelectedId])
    );
  };

  const updateQuantityOfItemsInCart = (event, _id) => {
    event.preventDefault();
    let indexOfItem = cart.findIndex((elem) => elem[_id]);
    setCart([...cart], (cart[indexOfItem][_id] = parseInt(event.target.value)));
    console.log("indexOfItem", indexOfItem);
    console.log("_id", _id);

    return localStorage.setItem("cart", JSON.stringify([...cart]));
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

  // console.log("cart", cart);

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
        updateQuantityOfItemsInCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
