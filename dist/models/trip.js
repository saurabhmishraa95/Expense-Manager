"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
class Trip {
    constructor(_name) {
        this._name = _name;
        this.categories = [];
        this.participants = [];
        this.expenses = [];
        this.categoryExpenseMap = new Map();
        this.particpantBalanceSheet = new Map();
        this._id = (0, uuidv4_1.uuid)();
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
}
exports.default = Trip;
//# sourceMappingURL=trip.js.map