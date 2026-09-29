import CashService from './vending/service/cashService.js';
// import { CASHES } from './consts/consts.js';

const CASHES = [
    { id: 'cash-50', value: 50 },
    { id: 'cash-100', value: 100 },
    { id: 'cash-200', value: 200 },
    { id: 'cash-500', value: 500},
];

const a = new CashService([], CASHES);


a.addCash({ id: 'cash-50', value: 50 });
a.addCash({ id: 'cash-500', value: 500})

a.changeCash();
console.log(a);