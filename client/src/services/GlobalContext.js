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
  const [customerData, setCustomerData] = useState([]);
  const [boughtItem, setBoughtItem] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const addProductToCart = async (
    id,
    event,
    quantityToAdd,
    productInformation
  ) => {
    event.preventDefault();
    let itemsObject = { [id]: quantityToAdd };
    if (cart?.filter((item) => item[id]).length > 0) {
      let indexOfItem = await cart.findIndex((item) => item[id]);
      await setCart([...cart], (cart[indexOfItem][id] += quantityToAdd));
    } else if (cart.filter((item) => item[id]).length === 0) {
      await setCart([...cart, itemsObject]);
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

  //This function runs every time the cart changes to find if we wanted to remove an item from our cart
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
  //check cart to find items in local storage
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
    setIsLoading(true);
    fetch("/confirmed-purchased")
      .then((res) => res.json())
      .then((customer) => {
        setCustomerData(customer?.customerData[0]?.formData);
        setBoughtItem(customer?.customerData[0]?.itemsData);
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
      const allItems = await Object.values(getItems);
      let idsOfItemsInCart = await cart?.map((object) =>
        parseInt(Object.keys(object)[0])
      );
      if (idsOfItemsInCart.length >= 1) {
        let itemsIncart = await idsOfItemsInCart?.map((id, index) => {
          return allItems?.filter((item) => {
            return item._id == parseInt(id);
          })[0];
        });
        let totals = await cart?.map((object, index) => {
          let quantity = object[parseInt(idsOfItemsInCart[index])]; //w
          let prices = itemsIncart[index]?.price.substr(1);
          let total = quantity * prices;
          return total;
        });
        setCartTotal(totals.reduce((a, b) => a + b));
      }
    }
  };

  console.log("cart", cart);
  console.log("cartTotal", cartTotal);

  //This function runs every time the cart changes to find if we wanted to remove an item from our cart
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
        setCartTotal,
        customerData,
        boughtItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
