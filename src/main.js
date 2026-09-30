import VendingMachine from './vending/service/vendingMachine.js';
import { CASHES, KEYPAD } from "./consts/consts.js";
import { INSERTED_CASHES, OWN_CASHES, PRODUCTS } from "./vending/data/data.js";

import slotBoardComponent from "./components/slotBoardComponent.js";
import cashComponent from "./components/cashComponent.js";
import cashBoxListComponent from "./components/cashBoxComponent.js";
import keypadComponent from "./components/keypadComponent.js";

const slotBoardContainer = document.getElementById('slot-board-container');
const cashBoxContainer = document.getElementById('cash-box-container');
const cashContainer = document.getElementById('cash-container');
const balanceContainer = document.getElementById('balance-container');
const productCodeContainer = document.getElementById('product-code-container');
const keypadContainer = document.getElementById('keypad-container');
const productContainer = document.getElementById('product-container');
const changeContainer = document.getElementById('change-container');
const messageContainer = document.getElementById('message-container');

const returnInsertedCashButton = document.getElementById('return-inserted-cash-button');
const codeButtons = document.querySelectorAll('.code-buttons');
const buyButton  = document.getElementById('buy-button');
const clearButton = document.getElementById('clear-button');
const reFillButton = document.getElementById('refill-button');

const vendingService = new VendingMachine(PRODUCTS, INSERTED_CASHES, OWN_CASHES);
let timer;

// Timer
function addTimer() {
    return setTimeout(() => {
        removeChange();
        removeProduct();
        removeMessage();
    }, 3000);
}

function clearTimer() {
    clearTimeout(timer);
    removeChange();
    removeProduct();
    removeMessage();
}

// Cash Container
function returnInsertedCash() {
    clearTimer();
    const change = vendingService.reject.call(vendingService);
    const balance = vendingService.getBalance();
    addBalance(balance);
    addChange(change);
    removeProduct();
}

function addCashContainer(cashes) {
    cashes.forEach(cash => {
        cashContainer.append(cashComponent(cash, refreshBalance));
    });
}

// Balance
function addBalance(balance) {
    balanceContainer.innerHTML = balance;
}

function refreshBalance(e) {
    clearTimer();
    const payment = vendingService.pay.call(vendingService, e);
    if(payment === undefined) {
        const message = vendingService.getMessage();
        addMessage(message);
        timer = addTimer();
    }

    const balance = vendingService.getBalance();
    addBalance(balance);
}

// Message
function addMessage(message) {
    messageContainer.innerText = '';
    messageContainer.innerText = message;
}

function removeMessage() {
    vendingService.deleteMessage();
    messageContainer.innerText = '';
}

// Product
function addSlotsBoardContainer(products) {
    slotBoardContainer.innerHTML = '';
    slotBoardContainer.append(slotBoardComponent(products));
}

function buyProduct() {
    const code = vendingService.getCode();
    const ableToBuy = vendingService.buy.call(vendingService, code);
    const ownCashes = vendingService.getOwnCashes();
    const balance = vendingService.getBalance();
    const products = vendingService.getAllProducts();
    const message = vendingService.getMessage();
    addMessage(message);
    timer = addTimer();

    vendingService.deleteCode();

    if(ableToBuy !== undefined) {
        const { product, change } = ableToBuy;
        const message = vendingService.getMessage();

        addMessage(message);
        addProduct(product);
        addChange(change);
    }

    addSlotsBoardContainer(products);
    addCashBox(ownCashes);
    addBalance(balance);
    removeCode();
}

function addProduct(product) {
    productContainer.innerHTML = '';
    productContainer.innerHTML = `<img width="100" height="100" src="src/img/${product}.png" alt="${product}"/>`;
}

function removeProduct() {
    productContainer.innerHTML = '';
}

// Cash Box
function addCashBox(ownCashes) {
    cashBoxContainer.innerHTML = '';
    cashBoxContainer.append(cashBoxListComponent(ownCashes));
}

function reFill() {
    clearTimeout(timer);
    removeMessage();
    removeChange();
    removeProduct();
    vendingService.reFill(4);
    const ownCashes = vendingService.getOwnCashes();
    const products = vendingService.getAllProducts();
    addCashBox(ownCashes);
    addSlotsBoardContainer(products);
}

// Change
function addChange(changes) {
    removeChange();
    changes.forEach(change => {
        changeContainer.innerHTML += `<div>${change.value}</div>`;
    });
}

function removeChange() {
    changeContainer.innerHTML = '';
}

// Code
function addCode(code) {
    productCodeContainer.innerText = code;
}

function removeCode() {
    productCodeContainer.innerHTML = '';
}

function refreshCode(e) {
    clearTimer();
    const { code } = e.currentTarget.dataset
    vendingService.writeCode(code);
    const newCode = vendingService.getCode();
    addCode(newCode);
}

function clearCode() {
    clearTimer();
    vendingService.deleteCode();
    removeCode();
}

function typeCode(value) {
    clearTimer();
    vendingService.writeCode(value);
    const newCode = vendingService.getCode();
    addCode(newCode);
    removeChange();
}

// Keypad
function addKeypad(keypad) {
    keypadContainer.innerHTML = '';
    keypadContainer.append(keypadComponent(keypad, refreshCode))
}

function keypadInput(e) {
    if(e.key === 'Enter') {
        buyProduct();
        return;
    }

    if(e.key === 'Backspace') {
        clearCode();
        return;
    }

    KEYPAD.forEach(({code, value}) => {
        if(e.code === code) {
            typeCode(value);
        }
    })
}

// Start
const start = () => {
    window.addEventListener('keydown', keypadInput);
    const products = vendingService.getAllProducts();
    const ownCashes = vendingService.getOwnCashes();
    const balance  = vendingService.getBalance();


    addSlotsBoardContainer(products);
    addKeypad(KEYPAD);
    addCashContainer(CASHES);
    addCashBox(ownCashes);
    addBalance(balance);

    returnInsertedCashButton.addEventListener('click', returnInsertedCash);

    codeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            clearTimer();
            removeProduct();
            refreshCode(e);
        });
    });

    buyButton.addEventListener('click', buyProduct);
    clearButton.addEventListener('click', clearCode);
    reFillButton.addEventListener('click', reFill);

}

start();
