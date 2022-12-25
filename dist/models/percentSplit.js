"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PercentSplit = void 0;
const split_1 = require("./split");
class PercentSplit extends split_1.Split {
    constructor(user, amountShare, _percentShare) {
        super(user, amountShare);
        this._percentShare = _percentShare;
    }
    get percentShare() {
        return this._percentShare;
    }
}
exports.PercentSplit = PercentSplit;
//# sourceMappingURL=percentSplit.js.map