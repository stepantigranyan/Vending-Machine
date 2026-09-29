import List from '../state/list.js';
import CashAcceptor from '../state/cashAcceptor.js';

class VendingMachine {
    constructor(products, insertedCashes, ownCashes) {
        this.list = new List(products);
        this.cashAcceptor = new CashAcceptor(insertedCashes, ownCashes);
        this.code = '';
    }

    getAllProducts() {
        return this.list.getAll();
    }

    getBalance() {
        return this.cashAcceptor.balance;
    }

    getCode () {
        return this.code;
    }

    writeCode(symbol) {
        if (this.code.length >= 2) {
            return this.code;
        }

        return this.code += symbol;
    }

    removeCode() {
        this.code = '';
        return this.code;
    }

    pay(cash) {
        try {
            console.log(this)
            this.cashAcceptor.addCash(cash);
            return cash;
        } catch (error) {
            return error;
        }
    }

    buy(code) {
        try {
            const { balance } = this.cashAcceptor;
            const product = this.list.takeOne(code, balance);

            const change = this.cashAcceptor.changeCash(product.price);

            return { change, product };
        } catch (error) {
            return error;
        }
    }

    reFill(quantity) {
        this.cashAcceptor.refillCash(quantity);
        this.list.reFillAll(quantity);
    }

    regret() {
        return this.cashAcceptor.returnCash();
    }
}

export default VendingMachine;
