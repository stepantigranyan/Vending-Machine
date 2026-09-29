import Cash from '../models/cash.js';

class CashRegister {
    constructor(insertedCash, ownCash) {
        this.insertedCash = this._initInsertedCash(insertedCash);
        this.ownCash = this._initOwnCash(ownCash);
        this.balance = this._initBalance();
    }

    _initInsertedCash(insertedCash) {
        return insertedCash.map(cash => new Cash(cash));
    }

    _initOwnCash(ownCash) {
        const ownCashStore = {};

        ownCash.forEach(cash => {
            if(ownCashStore[cash.id] === undefined) {
                ownCashStore[cash.id] = { cash: new Cash(cash), quantity: 0 };
            } else {
                ownCashStore[cash.id].quantity++;
            }
        });

        return ownCashStore;
    }

    _initBalance() {
        return this.insertedCash.reduce((acc, current) => acc + current.value, 0);
    }
}

export default CashRegister;