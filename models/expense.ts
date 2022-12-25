import Category from "./category";
import { Split } from "./split";
import { PercentSplit } from "./percentSplit";
import { EqualSplit } from "./equalSplit";
import { SplitType } from "./splitType";
import User from "./user";
import { uuid } from "uuidv4";

export default class Expense {
  private _id: string;
  constructor(
    private _category: Category,
    private _totalAmount: number,
    private _splitType: SplitType,
    private _createdBy: User,
    private _splits: EqualSplit[] | PercentSplit[]
  ) {
    this._id = uuid();
  }

  public get splits(): EqualSplit[] | PercentSplit[] {
    return this._splits;
  }

  public get createdBy(): User {
    return this._createdBy;
  }

  public get splitType(): SplitType {
    return this._splitType;
  }

  public get totalAmount(): number {
    return this._totalAmount;
  }

  public get category(): Category {
    return this._category;
  }

  public get id(): string {
    return this._id;
  }
}
