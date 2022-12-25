"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PercentSplit = exports.EqualSplit = exports.Split = void 0;
class Split {
  //here share could be either percent amount or actual amount
  constructor(_user, _amountShare) {
    this._user = _user;
    this._amountShare = _amountShare;
  }
  get user() {
    return this._user;
  }
  get amountShare() {
    return this._amountShare;
  }
}
exports.Split = Split;
class EqualSplit extends Split {
  constructor(user, amountShare) {
    super(user, amountShare);
  }
}
exports.EqualSplit = EqualSplit;
class PercentSplit extends Split {
  constructor(user, amountShare, _percentShare) {
    super(user, amountShare);
    this._percentShare = _percentShare;
  }
  get percentShare() {
    return this._percentShare;
  }
}
exports.PercentSplit = PercentSplit;
//# sourceMappingURL=split.js.map
