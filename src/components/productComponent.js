const productComponent = ({ name, price, code, quantity }) => {
    return `
            <div class="bg-gray-300 grid grid-rows-[3fr_1fr]">
                <div class="flex justify-center items-center">
                    ${name}
                </div>
                <div class="bg-green-600 flex justify-between items-center text-white px-1">
                    <span>${price}</span>
                    <span data-code="${code}">${quantity}</span>
              </div>
            </div>
        `;
};

export default productComponent;