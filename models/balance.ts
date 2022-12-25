import User from "./user";

export default class Balance {
  private _owes: number;
  private _owed: number;
  constructor() {
    this._owes = 0;
    this._owed = 0;
  }

  public get owed(): number {
    return this._owed;
  }
  public set owed(value: number) {
    this._owed = value;
  }
  public get owes(): number {
    return this._owes;
  }
  public set owes(value: number) {
    this._owes = value;
  }
}
