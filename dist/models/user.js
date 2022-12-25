"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
class User {
    constructor(_name) {
        this._name = _name;
        this._id = (0, uuidv4_1.uuid)();
    }
    get name() {
        return this._name;
    }
    get id() {
        return this._id;
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map