"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expense_1 = __importDefault(require("../models/expense"));
class PercentExpenseStrategy {
    createExpense(expenseRequest) {
        const { trip, category, madeBy, amount, splitType, splits } = expenseRequest;
        if (!this.validateSplits(splits)) {
            console.log("Invalid splits for percent expense");
            return null;
        }
        const userBalance = trip.particpantBalanceSheet.get(madeBy);
        userBalance.owed += amount;
        trip.categoryExpenseMap.set(category, trip.categoryExpenseMap.get(category) + amount);
        splits.forEach((split) => {
            const participantBalance = trip.particpantBalanceSheet.get(split.user);
            if (madeBy == split.user) {
                userBalance.owed -= split.amountShare;
            }
            else {
                participantBalance.owes += split.amountShare;
            }
        });
        console.log(`INR ${amount} expense made by ${madeBy.name} for ${trip.name} trip split unequally`);
        return new expense_1.default(category, amount, splitType, madeBy, splits);
    }
    validateSplits(splits) {
        if (splits.length === 0) {
            return false;
        }
        const totalPercentage = splits.reduce((sum, split) => {
            return sum + split.percentShare;
        }, 0);
        if (totalPercentage !== 100) {
            return false;
        }
        return true;
    }
}
exports.default = PercentExpenseStrategy;
//# sourceMappingURL=percentExpenseStrategy.js.map