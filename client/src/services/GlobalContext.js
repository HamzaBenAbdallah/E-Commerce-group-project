import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [getItems, setGetItems] = useState([]);

  useEffect(() => {
    fetch("/get-items")
      .then((res) => res.json())
      .then((itemData) => {
        return setGetItems(itemData.items);
      });
  }, []);

  return (
    <GlobalContext.Provider value={{ getItems }}>
      {children}
    </GlobalContext.Provider>
  );
};
