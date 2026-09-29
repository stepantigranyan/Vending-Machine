import VendingMachine from './vending/service/vendingMachine.js';
import { CASHES } from "./consts/consts.js";
import { INSERTED_CASHES, OWN_CASHES, PRODUCTS } from "./vending/data/data.js";

import slotBoardComponent from "./components/slotBoardComponent.js";
import cashComponent from "./components/cashComponent.js";

const slotBoardContainer = document.getElementById('slot-board-container');
const cashContainer = document.getElementById('cash-container');
const balanceContainer = document.getElementById('balance-container');
const productCodeContainer = document.getElementById('product-code-container');
const productContainer = document.getElementById('product-container');
const changeContainer = document.getElementById('change-container');

const returnInsertedCashButton = document.getElementById('return-inserted-cash-button');
const codeButtons = document.querySelectorAll('.code-buttons');
const buyButton  = document.getElementById('buy-button');

const vendingService = new VendingMachine(PRODUCTS, INSERTED_CASHES, OWN_CASHES);


function refreshBalance(e) {
    vendingService.pay.call(vendingService, e);
    drawBalance(vendingService.getBalance());
}

function returnInsertedCash() {
    const change = vendingService.regret.call(vendingService);
    drawBalance(vendingService.getBalance());
    drawChange(change);
}

function refreshCode(e) {
    vendingService.writeCode(e.currentTarget.dataset.code);
    drawCode(vendingService.getCode());
    removeChange();
}

function buyProduct() {
    const code = vendingService.getCode()
    drawProduct(vendingService.buy.call(vendingService, code));
    console.log(vendingService);
    drawCode(vendingService.removeCode());
}

const drawSlotsBoardContainer = (products) => {
    slotBoardContainer.append(slotBoardComponent(products));
}

function drawCode(code) {
    productCodeContainer.innerText = code;
}

function drawProduct(product) {
    productContainer.innerHTML = `<span>${product.name}</span>`;
}

function removeProduct() {

}

function drawChange(changes) {
    removeChange();
    console.log(changes)
    changes.forEach(change => {
        changeContainer.innerHTML += `<div>${change.value}</div>`;
    });
}

function removeChange() {
    changeContainer.innerHTML = '';
}

function drawCashesContainer(cashes) {
    cashes.forEach(cash => {
        cashContainer.append(cashComponent(cash, refreshBalance));
    });
}

function drawBalance(balance) {
    balanceContainer.innerHTML = balance;
}

const start = () => {
    drawSlotsBoardContainer(vendingService.getAllProducts());
    drawCashesContainer(CASHES);
    drawBalance(vendingService.getBalance());

    returnInsertedCashButton.addEventListener('click', returnInsertedCash);

    codeButtons.forEach(button => {
        button.addEventListener('click', refreshCode);

    });

    buyButton.addEventListener('click', buyProduct);

}

start();

// console.log(a.pay({ id: 'cash-500', value: 500}));
// console.log(a.pay({ id: 'cash-500', value: 500}));
// console.log(a.pay({ id: 'cash-500', value: 500}));
// console.log(a.pay({ id: 'cash-500', value: 500}));

// console.log(a.buy('C1'));


// a.reFill(5);

// // a.addCash({ id: 'cash-200', value: 200});
// // a.addCash({ id: 'cash-100', value: 100});
// // a.addCash({ id: 'cash-100', value: 100});
// // a.addCash({ id: 'cash-100', value: 100});

// console.log(a.changeCash(450));
// console.log(a);
