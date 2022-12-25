"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const equalExpenseStrategy_1 = __importDefault(require("../services/equalExpenseStrategy"));
const percentExpenseStrategy_1 = __importDefault(require("../services/percentExpenseStrategy"));
class ExpenseStrategyFactory {
    constructor() {
        this.splitTypeExpenseStrategyMap = new Map([
            [0 /* Equal */, new equalExpenseStrategy_1.default()],
            [1 /* Percent */, new percentExpenseStrategy_1.default()],
        ]);
    }
    getExpenseStrategy(splitType) {
        return this.splitTypeExpenseStrategyMap.get(splitType);
    }
}
exports.default = ExpenseStrategyFactory;
//# sourceMappingURL=expenseStrategyFactory.js.map