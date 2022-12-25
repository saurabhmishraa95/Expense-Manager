"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
    }
    getUserByName(userName) {
        return this.users.find((user) => user.name === userName);
    }
}
exports.default = UserService;
//# sourceMappingURL=userService.js.map