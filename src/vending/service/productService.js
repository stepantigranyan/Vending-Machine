import List from '../state/list.js';

class ProductService {
    constructor(list) {
        this.list = new List(list);
    }

    getAll() {
        return this.list;
    }

    getByCode(code) {
        return this.list.find((product) => product.code === code);
    }


    reFillAll(quantity) {
        this.list.forEach((product) => {
            product.quantity = quantity;
            return product;
        });
        return this.list;
    }
}

export default ProductService;
