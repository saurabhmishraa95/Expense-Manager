import IExpenseRequest from "../contracts/expenseRequest";
import Expense from "../models/expense";

export default interface IExpenseStrategy {
  createExpense(expenseRequest: IExpenseRequest): Expense | null;
}
