"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Expense {
  constructor(_category, _totalAmount, _splitType, _createdBy, _splits) {
    this._category = _category;
    this._totalAmount = _totalAmount;
    this._splitType = _splitType;
    this._createdBy = _createdBy;
    this._splits = _splits;
    this._id = "";
  }
  get splits() {
    return this._splits;
  }
  get createdBy() {
    return this._createdBy;
  }
  get splitType() {
    return this._splitType;
  }
  get totalAmount() {
    return this._totalAmount;
  }
  get category() {
    return this._category;
  }
  get id() {
    return this._id;
  }
}
exports.default = Expense;
//# sourceMappingURL=expense.js.map
