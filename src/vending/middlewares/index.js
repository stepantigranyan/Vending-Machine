import Product from "../models/product.js";
import Cash from "../models/cash.js";

export const addListToLocalStorage = (list) => {
  localStorage.setItem("list", JSON.stringify(list));
};

export const getListFromLocalStorage = () => {
  const dataList = JSON.parse(localStorage.getItem("list"));

  if (dataList === null || dataList === undefined) {
    return undefined;
  }

  return dataList.map((item) => new Product(item));
};

export const addCashToLocaleStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getCashFromLocalStorage = (name) => {
  const dataCashes = JSON.parse(localStorage.getItem(name));

  if (dataCashes === null || dataCashes === undefined) {
    return undefined;
  }

  const newData = {};

  for (const key in dataCashes) {
    const { quantity } = dataCashes[key];
    const { id, value } = dataCashes[key].cash;
    newData[key] = { cash: new Cash({ id, value }), quantity: quantity };
  }

  return newData;
};
