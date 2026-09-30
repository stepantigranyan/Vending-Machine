import { CASHES } from "../consts/consts.js";

const cashComponent = ({id, value}, onPay) => {
    const cash = document.createElement('div')
    cash.setAttribute('id', id);
    cash.setAttribute('data-id', id);
    cash.classList.add(
        'cursor-pointer',
        'size-15',
        'rounded-full',
        'bg-yellow-700',
        'flex',
        'justify-center',
        'items-center',
        'hover:bg-yellow-900'
    );

    cash.innerHTML = `<span class="text-sm text-white">${value}֏<span>`;

    cash.addEventListener('click', () => {
        onPay(CASHES.find((item) => item.id === id));
    })

    return cash;
}

export default cashComponent;