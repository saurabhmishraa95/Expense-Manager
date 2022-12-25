"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
class Category {
    constructor(_name) {
        this._name = _name;
        this._id = (0, uuidv4_1.uuid)();
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
}
exports.default = Category;
//# sourceMappingURL=category.js.map