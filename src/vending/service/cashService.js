import CashRegister from '../state/cashRegister.js';
import { CASHES } from '../../consts/consts.js';

class CashService {
    constructor(insertedCash, ownCash) {
        this.cashRegister = new CashRegister(insertedCash, ownCash);
    }

    addCash(cash) {
        this.cashRegister.insertedCash.push(cash);
        this.cashRegister.balance += cash.value;
        return this.cashRegister;
    }

    returnCash() {
        return this.cashRegister.insertedCash;
    }

    changeCash(price) {
        const { ownCash } = this.cashRegister;
        const change = [];

        const cashesId = CASHES.map(cash => cash.id);
        let index = cashesId.length - 1;

        const cashes = Object.keys(ownCash);
        console.log(cashes);
    }

    clearAll() {
        this.cashRegister.insertedCash = [];
        this.cashRegister.balance = 0;
    }
}

export default CashService;
