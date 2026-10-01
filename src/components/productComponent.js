const productComponent = ({ name, price, code, quantity, img }) => {
  let images = "";

  for (let i = 0; i < quantity; i++) {
    images += `<img class="block drop-shadow-lg drop-shadow-black size-20 absolute translate-x-[-50%] translate-y-[-60%]" style="top: calc(40% + ${(i + 1) * 10}px); z-index: ${i + 1}; left: calc(50% + ${i * 5}px" src="src/img/${img}" alt="${name}"/>`;
  }

  return `
            <div class="grid grid-rows-[3fr_1fr]">
                <div class="relative w-full h-full bg-gray-300 z-100">
                    ${images}
                </div>
                <div class="${quantity === 0 ? "bg-gray-500" : "bg-green-600"} grid grid-rows-2">
                    <h5 class="text-center text-white">${name}</h5>
                    <div class="${quantity === 0 ? "bg-gray-500" : "bg-green-600"} flex justify-around items-center text-white px-2">
                        <span class="text-xs">${code}</span>
                        <span class="text-xs">${price}֏</span>
                        <span class="text-xs" data-code="${code}">Qty: ${quantity}</span>
                     </div>
                </div>
            </div>
        `;
};

export default productComponent;
