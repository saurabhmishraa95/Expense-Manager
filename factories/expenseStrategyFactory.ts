import { SplitType } from "../models/splitType";
import EqualExpenseStrategy from "../services/equalExpenseStrategy";
import IExpenseStrategy from "../services/expenseStrategy";
import PercentExpenseStrategy from "../services/percentExpenseStrategy";

export default class ExpenseStrategyFactory {
  private splitTypeExpenseStrategyMap = new Map<SplitType, IExpenseStrategy>([
    [SplitType.Equal, new EqualExpenseStrategy()],
    [SplitType.Percent, new PercentExpenseStrategy()],
  ]);

  getExpenseStrategy(splitType: SplitType): IExpenseStrategy | undefined {
    return this.splitTypeExpenseStrategyMap.get(splitType);
  }
}
