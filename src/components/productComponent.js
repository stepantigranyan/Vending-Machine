const productComponent = ({ name, price, code, quantity }) => {
    let images = '';

    if (quantity > 0) {
        for (let i = 0; i < quantity; i++) {
            images += `<img class="block size-[50%] absolute left-[50%] translate-x-[-50%] top-[calc(40%+${(i + 1) * 10}px)] translate-y-[-60%] z-${(i + 1) * 10}" src="src/img/${name}.png" alt="${name}"/>`
        }
    }

    return `
            <div class="bg-gray-300 grid grid-rows-[3fr_1fr]">
                <div class="relative w-full h-full">
                    ${quantity === 0 ? '' : images }
                </div>
                <div class="${quantity === 0 ? 'bg-gray-500' : 'bg-green-600'} grid grid-rows-2">
                    <h5 class="text-center text-white">${name}</h5>
                    <div class="${quantity === 0 ? 'bg-gray-500' : 'bg-green-600'} flex justify-around items-center text-white px-2">
                        <span class="text-xs">${code}</span>
                        <span class="text-xs">${price}֏</span>
                        <span class="text-xs" data-code="${code}">Qty: ${quantity}</span>
                     </div>
                </div>
            </div>
        `;
};

export default productComponent;