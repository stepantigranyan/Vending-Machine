const keypadButtonComponent = ({ dataCode, value }, onClick) => {
  const button = document.createElement("button");
  button.classList.add(
    "code-buttons",
    "cursor-pointer",
    "bg-gray-200",
    "text-xl",
    "border",
    "border-gray-900",
    "hover:bg-gray-300",
  );
  button.setAttribute("data-code", dataCode);
  button.innerHTML = value;

  button.addEventListener("click", onClick);

  return button;
};

export default keypadButtonComponent;
