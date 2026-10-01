class VendingMachineError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  static NoPlaceForMoney() {
    return new VendingMachineError("No Place for Money");
  }

  static WrongCode() {
    return new VendingMachineError("Wrong Code");
  }

  static NoChange() {
    return new VendingMachineError("No Change");
  }

  static SoldOut() {
    return new VendingMachineError("Sold Out");
  }

  static NotEnoughMoney(missing) {
    return new VendingMachineError(`Not Enough Money. Add ${missing}֏`);
  }
}

export default VendingMachineError;
