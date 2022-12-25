import { uuid } from "uuidv4";

export default class Category {
  private _id: string;
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
