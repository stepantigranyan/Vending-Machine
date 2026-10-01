import Cash from "../models/cash.js";
import VendingMachineError from "../errors/index.js";
import { CASHES } from "../../consts/index.js";
import {
  addCashToLocaleStorage,
  getCashFromLocalStorage,
} from "../middlewares/index.js";

class CashAcceptor {
  constructor(insertedCash, ownCash) {
    this.insertedCash = this._initBox(insertedCash, "insertedCash");
    this.ownCash = this._initBox(ownCash, "ownCash");
    this.balance = this._initBalance();
    this.allCashesTypes = CASHES.map((cash) => cash.id);
  }

  _initBox(cashes, name) {
    if (getCashFromLocalStorage(name) === undefined) {
      const box = {};
      cashes.forEach(({ quantity, cash }) => {
        box[cash.id] = {
          cash: new Cash(cash),
          quantity: quantity,
        };
      });

      addCashToLocaleStorage(name, box);
      return getCashFromLocalStorage(name);
    }

    return getCashFromLocalStorage(name);
  }

  _initBalance() {
    const { insertedCash } = this;
    const cashTypes = Object.keys(insertedCash);

    return cashTypes.reduce((acc, current) => {
      const { quantity, cash } = insertedCash[current];
      if (quantity !== 0) {
        acc += cash.value * quantity;
      }
      return acc;
    }, 0);
  }

  addCash(cash) {
    if (cash.value > 0 && this.balance + cash.value > 2000) {
      throw VendingMachineError.NoPlaceForMoney();
    }

    console.log(this.insertedCash, this.ownCash);

    this.insertedCash[cash.id].quantity++;
    this.ownCash[cash.id].quantity++;
    this.balance += cash.value;

    addCashToLocaleStorage("insertedCash", this.insertedCash);
    addCashToLocaleStorage("ownCash", this.ownCash);
  }

  changeCash(price) {
    const { insertedCash, ownCash, balance } = this;

    const copiedInsertedCash = JSON.parse(JSON.stringify(insertedCash));
    const copiedOwnCash = JSON.parse(JSON.stringify(ownCash));

    let copiedBalance = balance;

    const change = [];
    let neededCashForChange = copiedBalance - price;

    const { allCashesTypes } = this;
    let ableGiveChange = false;

    for (let i = 0; i < allCashesTypes.length; i++) {
      const cashType = allCashesTypes[i];

      while (copiedOwnCash[cashType].quantity > 0) {
        if (neededCashForChange - copiedOwnCash[cashType].cash.value >= 0) {
          neededCashForChange -= copiedOwnCash[cashType].cash.value;
          copiedOwnCash[cashType].quantity--;
          change.push(copiedOwnCash[cashType].cash);
        } else {
          break;
        }
      }

      if (neededCashForChange === 0) {
        ableGiveChange = true;
        break;
      }
    }

    if (ableGiveChange) {
      for (const cashName in copiedInsertedCash) {
        this.insertedCash[cashName].quantity = 0;
        this.balance = 0;
      }

      this.ownCash = copiedOwnCash;

      addCashToLocaleStorage("ownCash", this.ownCash);
      addCashToLocaleStorage("insertedCash", this.insertedCash);

      return change.map((cash) => new Cash(cash));
    }

    throw VendingMachineError.NoChange();
  }

  returnCash() {
    const copiedInsertedCash = JSON.parse(JSON.stringify(this.insertedCash));
    const returnedCash = [];

    for (const key in copiedInsertedCash) {
      for (let i = 0; i < copiedInsertedCash[key].quantity; i++) {
        returnedCash.push(new Cash(copiedInsertedCash[key].cash));
      }
      this.ownCash[key].quantity -= copiedInsertedCash[key].quantity;
    }

    for (const key in this.insertedCash) {
      this.insertedCash[key].quantity = 0;
    }

    addCashToLocaleStorage("insertedCash", this.insertedCash);

    this.balance = 0;

    return returnedCash;
  }

  refillCash(quantity) {
    for (const key in this.ownCash) {
      this.ownCash[key].quantity = quantity;
    }
    addCashToLocaleStorage("ownCash", this.ownCash);
  }
}

export default CashAcceptor;
