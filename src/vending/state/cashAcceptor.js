import Cash from '../models/cash.js';
import VendingMachineError from '../errors/error.js';
import {CASHES} from "../../consts/consts.js";

class CashAcceptor {
    constructor(insertedCash, ownCash) {
        this.insertedCash = this._initInsertedCash(insertedCash);
        this.ownCash = this._initOwnCash(ownCash);
        this.balance = this._initBalance();
        this.allCashesTypes = CASHES.map(cash => cash.id);
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
        if(cash.value > 0 && this.balance + cash.value > 2000) {
            throw VendingMachineError.NoPlaceForMoney();
        }

        this.insertedCash[cash.id].quantity++;
        this.ownCash[cash.id].quantity++;
        this.balance += cash.value;
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
            const cashType  = allCashesTypes[i];

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

            return change.map(cash => new Cash(cash));
        }

        throw VendingMachineError.NoChange();
    }

    returnCash() {
        const copiedInsertedCash = JSON.parse(JSON.stringify(this.insertedCash));
        const returnedCash = [];

        for (const key in copiedInsertedCash) {
            for( let i = 0; i < copiedInsertedCash[key].quantity; i++) {
                returnedCash.push(new Cash(copiedInsertedCash[key].cash));
            }
            this.ownCash[key].quantity -= copiedInsertedCash[key].quantity;
        }

        for (const key in this.insertedCash) {
            this.insertedCash[key].quantity = 0;
        }

        this.balance = 0;

        return returnedCash;
    }

    refillCash(quantity) {
        for (const key in this.ownCash) {
            this.ownCash[key].quantity = quantity;
        }
    }
}

export default CashAcceptor;