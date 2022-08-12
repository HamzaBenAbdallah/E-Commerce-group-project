import React, { useContext, useState, createContext } from "react";
import { GlobalContext } from "./GlobalContext";

export const FilterContext = createContext(null);

export const FilterProviders = ({ children }) => {
  const itemData = useContext(GlobalContext);

  const { getItems } = itemData;

  const [getCategory, setGetCategory] = useState([]);
  const [getBodyLocation, setGetBodyLocation] = useState([]);
  const [resetBtn, setResetBtn] = useState(false);

  const handleCategory = (data) => {
    const newVal = [...getCategory];
    if (data.target.checked === true) {
      newVal.push(data.target.value);
    } else if (data.target.checked === false) {
      const removeIdx = newVal.indexOf(data.target.value);
      newVal.splice(removeIdx, 1);
    }
    setGetCategory(newVal);
  };

  const handleBodyLocation = (data) => {
    const bodyValue = [...getBodyLocation];
    if (data.target.checked === true) {
      bodyValue.push(data.target.value);
    } else if (data.target.checked === false) {
      const removeIdx = bodyValue.indexOf(data.target.value);
      bodyValue.splice(removeIdx, 1);
    }
    setGetBodyLocation(bodyValue);
  };

  // const handleBrands = (data) => {
  //   const bodyValue = [...getBodyLocation];
  //   if (data.target.checked === true) {
  //     bodyValue.push(data.target.value);
  //   } else if (data.target.checked === false) {
  //     const removeIdx = bodyValue.indexOf(data.target.value);
  //     bodyValue.splice(removeIdx, 1);
  //   }
  //   setGetBodyLocation(bodyValue);
  // };

  const getAllItems = Object.values(getItems);

  const filterAllSeletions = getAllItems.filter((item) => {
    if (getCategory.includes(item.category) && getBodyLocation.length < 1) {
      return true;
    } else if (
      getBodyLocation.includes(item.body_location) &&
      getCategory.length < 1
    ) {
      return true;
    } else if (
      getCategory.includes(item.category) &&
      getBodyLocation.includes(item.body_location)
    ) {
      return true;
    } else if (
      getCategory.includes(item.category) &&
      !getBodyLocation.includes(item.body_location)
    ) {
      return false;
    } else if (
      getCategory.includes(item.body_location) &&
      !getBodyLocation.includes(item.category)
    ) {
    } else {
      return false;
    }
  });

  return (
    <FilterContext.Provider
      value={{
        handleCategory,
        handleBodyLocation,
        filterAllSeletions,
        getAllItems,
        getCategory,
        getBodyLocation,
        setGetBodyLocation,
        setGetCategory,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
