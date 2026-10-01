import productComponent from "./productComponent.js";

const slotBoardComponent = (products) => {
  const rows = Math.ceil(products.length / 3);
  const slotsBoard = document.createElement("div");
  slotsBoard.classList.add(
    "bg-gray-900",
    "h-full",
    "grid",
    "grid-cols-3",
    `grid-rows-${rows}`,
    "gap-1",
    "p-1",
  );

  let slots = "";

  for (let i = 0; i < products.length; i++) {
    slots += productComponent(products[i]);
  }

  slotsBoard.innerHTML = slots;

  return slotsBoard;
};

export default slotBoardComponent;
