import User from "./user";
import { Split } from "./split";

export class EqualSplit extends Split {
  constructor(user: User, amountShare: number) {
    super(user, amountShare);
  }
}
