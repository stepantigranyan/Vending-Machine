import Product from '../models/product.js';
import VendingMachineError from '../errors/error.js';

class List {
    constructor(products) {
        this.list = this._initList(products);
    }

    _initList(products) {
        return products.map((product) => new Product(product));
    }

    getAll() {
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
            throw VendingMachineError.NotEnoughMoney();
        }

        return { name: product.name, price: product.price };
    }

    takeOne(code) {
        this._getOne(code).quantity--;
    }

    _getOne(code) {
        return this.list.find((product) => product.code === code);
    }

    reFillAll(quantity) {
        this.list.forEach((product) => (product.quantity = quantity));
    }
}

export default List;
