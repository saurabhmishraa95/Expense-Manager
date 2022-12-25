import IExpenseRequest from "../contracts/expenseRequest";
import Balance from "../models/balance";
import Category from "../models/category";
import Expense from "../models/expense";
import { EqualSplit } from "../models/equalSplit";
import { SplitType } from "../models/splitType";
import User from "../models/user";
import IExpenseStrategy from "./expenseStrategy";

export default class EqualExpenseStrategy implements IExpenseStrategy {
  createExpense(expenseRequest: IExpenseRequest): Expense {
    const { trip, category, madeBy, amount, splitType, splits } =
      expenseRequest;
    const userBalance = trip.particpantBalanceSheet.get(madeBy) as Balance;
    userBalance.owed += amount;
    trip.categoryExpenseMap.set(
      category,
      (trip.categoryExpenseMap.get(category) as number) + amount
    );
    const participants = trip.participants;
    const splitAmount = amount / participants.length;
    participants.forEach((participant) => {
      const participantBalance = trip.particpantBalanceSheet.get(
        participant
      ) as Balance;
      if (madeBy == participant) {
        userBalance.owed -= splitAmount;
      } else {
        participantBalance.owes += splitAmount;
      }
      (splits as EqualSplit[]).push(new EqualSplit(madeBy, splitAmount));
    });
    console.log(
      `INR ${amount} expense made by ${madeBy.name} for ${trip.name} trip split equally`
    );
    return new Expense(category, amount, splitType, madeBy, splits);
  }
}
