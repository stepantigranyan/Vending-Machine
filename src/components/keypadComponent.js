import keypadButtonComponent from "./keypadButtonComponent.js";

const keypadComponent = (keypad, onClick) => {
    const rows = Math.ceil(keypad.length / 3);
    const keypadContainer = document.createElement('div');
    keypadContainer.classList.add('grid', 'grid-cols-3', `grid-rows-${rows}`, 'gap-1', 'w-full', 'h-full');

    keypad.forEach(button => {
        keypadContainer.append(keypadButtonComponent(button, onClick));
    })

    return keypadContainer;
}

export default keypadComponent;