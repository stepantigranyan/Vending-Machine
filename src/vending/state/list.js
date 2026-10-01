import VendingMachineError from "../errors/index.js";
import {
  addListToLocalStorage,
  getListFromLocalStorage,
} from "../middlewares/index.js";

class List {
  constructor(products) {
    this.list = this._initList(products);
  }

  _initList(products) {
    if (getListFromLocalStorage() === undefined) {
      addListToLocalStorage(products);
      return getListFromLocalStorage();
    }
    return getListFromLocalStorage();
  }

  getAll() {
    this.list = getListFromLocalStorage();
    return this.list;
  }

  getOne(code, balance) {
    const product = this._getOne(code);

    if (product === undefined) {
      throw VendingMachineError.WrongCode();
    }

    if (product.quantity === 0) {
      throw VendingMachineError.SoldOut();
    }

    if (product.price > balance) {
      throw VendingMachineError.NotEnoughMoney(product.price - balance);
    }

    return { name: product.name, price: product.price };
  }

  takeOne(code) {
    this._getOne(code).quantity--;
    addListToLocalStorage(this.list);
  }

  _getOne(code) {
    return this.list.find((product) => product.code === code);
  }

  reFillAll(quantity) {
    this.list.forEach((product) => (product.quantity = quantity));
    addListToLocalStorage(this.list);
  }
}

export default List;
