const cashBoxListComponent = (cashes) => {
    const cashBoxContainer = document.createElement('ul');
    cashBoxContainer.classList.add('text-white', 'w-full');
    cashBoxContainer.innerHTML = '';

    cashes.forEach(({price, quantity}) => {
        cashBoxContainer.innerHTML += `
                <li class="flex justify-between items-center gap-x-3">
                    <span>${price}</span>
                    <span class="h-px w-full bg-white"></span>
                    <span>${quantity}</span>
                </li>
        
        `;
    });

    return cashBoxContainer;
};

export default cashBoxListComponent;
