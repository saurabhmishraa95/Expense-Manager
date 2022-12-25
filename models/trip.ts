import { uuid } from "uuidv4";
import Balance from "./balance";
import Category from "./category";
import Expense from "./expense";
import User from "./user";

export default class Trip {
  categories: Category[] = [];
  participants: User[] = [];
  expenses: Expense[] = [];
  categoryExpenseMap = new Map<Category, number>();
  particpantBalanceSheet = new Map<User, Balance>();
  _id: string;

  constructor(private _name: string) {
    this._id = uuid();
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }
}
