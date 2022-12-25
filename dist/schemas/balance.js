"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Balance {
  constructor() {
    this._owes = 0;
    this._owed = 0;
  }
  get owed() {
    return this._owed;
  }
  set owed(value) {
    this._owed = value;
  }
  get owes() {
    return this._owes;
  }
  set owes(value) {
    this._owes = value;
  }
}
exports.default = Balance;
//# sourceMappingURL=balance.js.map
