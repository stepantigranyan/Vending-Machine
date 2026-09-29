import Product from '../models/product.js';

class List {
    constructor(products) {
        this.list = this._initList(products);
    }

    _initList(products) {
        return products.map((product) => new Product(product));
    }
}

export default List;
