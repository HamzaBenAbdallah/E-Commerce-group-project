import React, { useContext, useState, createContext } from "react";
import { GlobalContext } from "./GlobalContext";

export const FilterContext = createContext(null);

export const FilterProviders = ({ children }) => {
  const itemData = useContext(GlobalContext);

  const { getItems } = itemData;

  const [getCategory, setGetCategory] = useState([]);
  const [getBodyLocation, setGetBodyLocation] = useState([]);
  const [isPriceSorted, setIsPriceSorted] = useState(false);

  const handleCategory = (data) => {
    const newVal = [...getCategory];
    console.log(
      `is checked:`,
      data.target.checked,
      `value:`,
      data.target.value
    );
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

  const getAllItems = Object.values(getItems);

  if (isPriceSorted === true) {
    getAllItems.sort((lowestPrice, highestPrice) => {
      const newLowestPrice = Number(lowestPrice.price.substring(1));
      const newHighestPrice = Number(highestPrice.price.substring(1));
      return newLowestPrice - newHighestPrice;
    });
  } else if (isPriceSorted === false) {
    getAllItems.sort((lowestPrice, highestPrice) => {
      const newLowestPrice = Number(lowestPrice.price.substring(1));
      const newHighestPrice = Number(highestPrice.price.substring(1));
      return newHighestPrice - newLowestPrice;
    });
  }

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

  if (filterAllSeletions.length > 0 && isPriceSorted === true) {
    filterAllSeletions.sort((lowestPrice, highestPrice) => {
      const newLowestPrice = Number(lowestPrice.price.substring(1));
      const newHighestPrice = Number(highestPrice.price.substring(1));
      return newLowestPrice - newHighestPrice;
    });
  } else if (filterAllSeletions.length > 0 && isPriceSorted === false) {
    filterAllSeletions.sort((lowestPrice, highestPrice) => {
      const newLowestPrice = Number(lowestPrice.price.substring(1));
      const newHighestPrice = Number(highestPrice.price.substring(1));
      return newHighestPrice - newLowestPrice;
    });
  }

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
        isPriceSorted,
        setIsPriceSorted,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
