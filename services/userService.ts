import User from "../models/user";

export default class UserService {
  users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUserByName(userName: string): User | undefined {
    return this.users.find((user) => user.name === userName);
  }
}
