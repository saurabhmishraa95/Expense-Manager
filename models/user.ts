import { uuid } from "uuidv4";

export default class User {
  private _id: string;
  constructor(private _name: string) {
    this._id = uuid();
  }

  public get name(): string {
    return this._name;
  }

  public get id(): string {
    return this._id;
  }
}
