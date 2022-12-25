"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expense_1 = __importDefault(require("../models/expense"));
const equalSplit_1 = require("../models/equalSplit");
class EqualExpenseStrategy {
    createExpense(expenseRequest) {
        const { trip, category, madeBy, amount, splitType, splits } = expenseRequest;
        const userBalance = trip.particpantBalanceSheet.get(madeBy);
        userBalance.owed += amount;
        trip.categoryExpenseMap.set(category, trip.categoryExpenseMap.get(category) + amount);
        const participants = trip.participants;
        const splitAmount = amount / participants.length;
        participants.forEach((participant) => {
            const participantBalance = trip.particpantBalanceSheet.get(participant);
            if (madeBy == participant) {
                userBalance.owed -= splitAmount;
            }
            else {
                participantBalance.owes += splitAmount;
            }
            splits.push(new equalSplit_1.EqualSplit(madeBy, splitAmount));
        });
        console.log(`INR ${amount} expense made by ${madeBy.name} for ${trip.name} trip split equally`);
        return new expense_1.default(category, amount, splitType, madeBy, splits);
    }
}
exports.default = EqualExpenseStrategy;
//# sourceMappingURL=equalExpenseStrategy.js.map