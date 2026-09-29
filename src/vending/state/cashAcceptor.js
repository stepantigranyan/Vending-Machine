import Cash from '../models/cash.js';
import VendingMachineError from '../errors/error.js';

class CashAcceptor {
    constructor(insertedCash, ownCash) {
        this.insertedCash = this._initInsertedCash(insertedCash);
        this.ownCash = this._initOwnCash(ownCash);
        this.balance = this._initBalance();
    }

    _initInsertedCash(insertedCash) {
        const insertedCashStore = {};
        insertedCash.forEach(({quantity, cash}) => {
            insertedCashStore[cash.id] = { cash: new Cash(cash), quantity: quantity }
        });
        return insertedCashStore;
    }

    _initOwnCash(ownCash) {
        const ownCashStore = {};
        ownCash.forEach(({quantity, cash}) => {
            ownCashStore[cash.id] = { cash: new Cash(cash), quantity: quantity };
        });
        return ownCashStore;
    }

    _initBalance() {
        const cashTypes = Object.keys(this.insertedCash);
        return cashTypes.reduce((acc, current) => {
            const { quantity, cash } = this.insertedCash[current];
            if (quantity !== 0) {
                acc += cash.value * quantity;
            }
            return  acc
        }, 0);
    }

    addCash(cash) {
        if(this.balance + cash.value > 2000) {
            throw VendingMachineError.NoPlaceForMoney();
        }

        this.insertedCash[cash.id].quantity++;
        this.balance += cash.value;
    }

    changeCash(price) {
        const { insertedCash, ownCash, balance } = this;

        const copiedInsertedCash = JSON.parse(JSON.stringify(insertedCash));
        const copiedOwnCash = JSON.parse(JSON.stringify(ownCash));
        let copiedBalance = balance;

        const change = [];
        let neededCashForChange = copiedBalance - price;


        let ableGiveChange = false;

        for (const cashName in copiedInsertedCash) {
            while (copiedInsertedCash[cashName].quantity > 0) {
                if (neededCashForChange - copiedInsertedCash[cashName].cash.value >= 0) {
                    neededCashForChange -= copiedInsertedCash[cashName].cash.value;
                    copiedInsertedCash[cashName].quantity--;
                    change.push(copiedInsertedCash[cashName].cash);
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
                this.ownCash[cashName].quantity = copiedOwnCash[cashName].quantity + copiedInsertedCash[cashName].quantity;
                this.balance = 0;
            }

            return change.map(cash => new Cash(cash));
        }

        for (const cashName in copiedOwnCash) {
            while (copiedOwnCash[cashName].quantity > 0) {
                if (neededCashForChange - copiedOwnCash[cashName].cash.value >= 0) {
                    neededCashForChange -= copiedOwnCash[cashName].cash.value;
                    copiedOwnCash[cashName].quantity--;
                    change.push(copiedOwnCash[cashName].cash);
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
            for (const cashName in copiedOwnCash) {
                this.insertedCash[cashName].quantity = 0;
                this.ownCash[cashName].quantity = copiedOwnCash[cashName].quantity + copiedInsertedCash[cashName].quantity;
                this.balance = 0;
            }

            return change.map(cash => new Cash(cash));
        }

        return VendingMachineError.NoChange();
    }

    returnCash() {
        const copiedInsertedCash = JSON.parse(JSON.stringify(this.insertedCash));
        const returnedCash = [];

        for (const key in copiedInsertedCash) {
            for( let i = 0; i < copiedInsertedCash[key].quantity; i++) {
                returnedCash.push(new Cash(copiedInsertedCash[key].cash));
            }
        }

        for (const key in this.insertedCash) {
            this.insertedCash[key].quantity = 0;
        }

        this.balance = 0;

        return returnedCash;
    }

    refillCash(quantity) {
        const { cashNames } = this;
        for ( let i = 0; i < cashNames.length; i++) {
            const cashName = cashNames[i];
            this.ownCash[cashName].quantity = quantity;
        }
    }
}

export default CashAcceptor;