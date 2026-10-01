import { CASHES } from "../consts/index.js";

const cashComponent = ({ id, value }, onPay) => {
  const cash = document.createElement("div");
  cash.setAttribute("id", id);
  cash.classList.add(
    "cursor-pointer",
    "size-15",
    "rounded-full",
    "border-yellow-900",
    "border-2",
    "bg-yellow-600",
    "flex",
    "justify-center",
    "items-center",
    "hover:bg-yellow-700",
  );
  cash.setAttribute("data-id", id);

  cash.innerHTML = `<span class="text-sm text-white">${value}֏<span>`;

  cash.addEventListener("click", () => {
    onPay(CASHES.find((cash) => cash.id === id));
  });

  return cash;
};

export default cashComponent;
