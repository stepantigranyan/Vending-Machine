import List from "../state/list.js";
import CashAcceptor from "../state/cashAcceptor.js";

class VendingMachine {
  constructor(products, insertedCashes, ownCashes) {
    this.list = new List(products);
    this.cashAcceptor = new CashAcceptor(insertedCashes, ownCashes);
    this.code = "";
    this.message = "";
  }

  getAllProducts() {
    return this.list.getAll();
  }

  getBalance() {
    return this.cashAcceptor.balance;
  }

  getOwnCashes() {
    const ownCashes = this.cashAcceptor.ownCash;
    const cashes = [];

    for (const key in ownCashes) {
      cashes.push({
        price: ownCashes[key].cash.value,
        quantity: ownCashes[key].quantity,
      });
    }

    return cashes;
  }

  getMessage() {
    return this.message;
  }

  deleteMessage() {
    this.message = "";
  }

  getCode() {
    return this.code;
  }

  writeCode(symbol) {
    if (this.code.length >= 2) {
      return this.code;
    }

    return (this.code += symbol);
  }

  deleteCode() {
    this.code = "";
  }

  pay(cash) {
    try {
      this.cashAcceptor.addCash(cash);
      return cash;
    } catch (error) {
      console.error(error);
      this.message = error.message;
      return undefined;
    }
  }

  buy(code) {
    try {
      const { balance } = this.cashAcceptor;
      const { name, price } = this.list.getOne(code, balance);

      const change = this.cashAcceptor.changeCash(price);
      this.list.takeOne(code);
      this.message = "Success";

      return { change, product: name };
    } catch (error) {
      this.message = error.message;
      return undefined;
    }
  }

  reFill(quantity) {
    this.cashAcceptor.refillCash(quantity);
    this.list.reFillAll(quantity);
    this.cashAcceptor.balance = 0;
  }

  reject() {
    return this.cashAcceptor.returnCash();
  }
}

export default VendingMachine;
