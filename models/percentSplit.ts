import User from "./user";
import { Split } from "./split";

export class PercentSplit extends Split {
  constructor(user: User, amountShare: number, private _percentShare: number) {
    super(user, amountShare);
  }

  public get percentShare(): number {
    return this._percentShare;
  }
}
