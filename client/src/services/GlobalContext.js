import React from "react";
import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(() => {
    if (cart.length <= 0) {
      return 0;
    } else if (cart.length >= 1) {
      return calculateCartTotal();
    }
  });

  const [getItems, setGetItems] = useState([]);
  const [getCompany, setGetCompany] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);

  const addProductToCart = async (id, event, quantityToAdd) => {
    event.preventDefault();
    let itemsObject = { [id]: quantityToAdd };
    if (cart?.filter((item) => item[id]).length > 0) {
      let indexOfItem = cart.findIndex((item) => item[id]);
      setCart([...cart], (cart[indexOfItem][id] += quantityToAdd));
    } else if (cart.filter((item) => item[id]).length === 0) {
      setCart([...cart, itemsObject]);
    }
  };

  const removeItemFromCart = (event, id) => {
    event.preventDefault();
    const newArrayWithoutSelectedId = cart.filter((object) => !object[id]);
    return setCart([...newArrayWithoutSelectedId]);
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

  const chekCartForEmptyItems = () => {
    let idsOfItemsInCart = cart.map((object) => Object.keys(object));
    for (let i = 0; i < cart.length; i++) {
      if (cart[i][parseInt(idsOfItemsInCart[i])] < 1) {
        let copyOfCart = [...cart];
        copyOfCart.splice(i, 1);
        setCart([...copyOfCart]);
        return console.log("deleted", cart[i]);
      }
    }
  };

  const checkCart = async () => {
    let cartFromLocalStorage = await localStorage.getItem("cart");
    if (cartFromLocalStorage) {
      await setCart(JSON.parse(cartFromLocalStorage));
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetch("/get-items")
      .then((res) => res.json())
      .then((itemData) => {
        setGetItems(itemData.items);
        setLoadingItems(true);
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

  useEffect(() => {
    calculateCartTotal();
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  const calculateCartTotal = async () => {
    if (cart.length >= 1) {
      const allItems = Object.values(getItems);
      let idsOfItemsInCart = cart?.map((object) =>
        parseInt(Object.keys(object)[0])
      );
      if (idsOfItemsInCart.length >= 1) {
        let itemsIncart = idsOfItemsInCart?.map((id, index) => {
          return allItems?.filter((item) => {
            return item._id == parseInt(id);
          })[0];
        });
        let totals = cart?.map((object, index) => {
          let quantity = object[parseInt(idsOfItemsInCart[index])]; //w
          let prices = itemsIncart[index]?.price.substr(1);
          let total = quantity * prices;
          return total;
        });
        setCartTotal(totals.reduce((a, b) => a + b));
      }
    }
  };

  useEffect(() => {
    chekCartForEmptyItems();
  }, [cart]);

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
        loadingItems,
        setCartTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
