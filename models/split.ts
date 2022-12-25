import User from "./user";

export abstract class Split {
  constructor(private _user: User, private _amountShare: number) {}

  public get user(): User {
    return this._user;
  }

  public get amountShare(): number {
    return this._amountShare;
  }
}
