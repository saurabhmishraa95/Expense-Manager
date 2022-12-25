import Category from "../models/category";
import { Split } from "../models/split";
import { PercentSplit } from "../models/percentSplit";
import { EqualSplit } from "../models/equalSplit";
import { SplitType } from "../models/splitType";
import Trip from "../models/trip";
import User from "../models/user";

export default interface IExpenseRequest {
  trip: Trip;
  category: Category;
  madeBy: User;
  amount: number;
  splitType: SplitType;
  splits: EqualSplit[] | PercentSplit[];
}
