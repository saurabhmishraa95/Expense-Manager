import IExpenseRequest from "../contracts/expenseRequest";
import Balance from "../models/balance";
import Expense from "../models/expense";
import { PercentSplit } from "../models/percentSplit";
import IExpenseStrategy from "./expenseStrategy";

export default class PercentExpenseStrategy implements IExpenseStrategy {
  createExpense(expenseRequest: IExpenseRequest): Expense | null {
    const { trip, category, madeBy, amount, splitType, splits } =
      expenseRequest;
    if (!this.validateSplits(splits as PercentSplit[])) {
      console.log("Invalid splits for percent expense");
      return null;
    }
    const userBalance = trip.particpantBalanceSheet.get(madeBy) as Balance;
    userBalance.owed += amount;

    trip.categoryExpenseMap.set(
      category,
      (trip.categoryExpenseMap.get(category) as number) + amount
    );
    splits.forEach((split) => {
      const participantBalance = trip.particpantBalanceSheet.get(
        split.user
      ) as Balance;
      if (madeBy == split.user) {
        userBalance.owed -= split.amountShare;
      } else {
        participantBalance.owes += split.amountShare;
      }
    });

    console.log(
      `INR ${amount} expense made by ${madeBy.name} for ${trip.name} trip split unequally`
    );
    return new Expense(category, amount, splitType, madeBy, splits);
  }

  private validateSplits(splits: PercentSplit[]): boolean {
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
