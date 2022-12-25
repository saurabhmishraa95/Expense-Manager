import IExpenseRequest from "../contracts/expenseRequest";
import ExpenseStrategyFactory from "../factories/expenseStrategyFactory";
import Balance from "../models/balance";
import Category from "../models/category";
import Trip from "../models/trip";
import User from "../models/user";
import TripService from "./tripService";
import UserService from "./userService";

export default class ExpenseManager {
  constructor(
    private userService: UserService,
    private tripService: TripService,
    private expenseStrategyFactory: ExpenseStrategyFactory
  ) {}

  createTrip(tripName: string): void {
    if (this.tripService.getTripByName(tripName)) {
      console.log(`Invalid Request: Trip already exists with name ${tripName}`);
      return;
    }
    this.tripService.addTripByName(tripName);
    console.log(`Trip ${tripName} created`);
  }

  fetchTrip(tripName: string): Trip | undefined {
    const trip = this.tripService.getTripByName(tripName);
    if (!trip) {
      console.log(`No trip exists with name ${tripName}, create a trip first.`);
    }
    return trip;
  }

  addCategory(trip: Trip, categoryName: string) {
    if (trip.categories.find((c) => c.name === categoryName)) {
      console.log(
        `Invalid Request: Category already exists with name ${categoryName}`
      );
      return;
    }
    const category = new Category(categoryName);
    trip.categories.push(category);
    trip.categoryExpenseMap.set(category, 0);
    console.log(`Category ${categoryName} created`);
  }

  addParticipant(trip: Trip, participantName: string) {
    if (trip.participants.find((p) => p.name === participantName)) {
      console.log(
        `Invalid Request: Participant already exists with name ${participantName}`
      );
      return;
    }
    let participant = this.userService.getUserByName(participantName);
    if (!participant) {
      participant = new User(participantName);
      this.userService.addUser(participant);
    }
    trip.participants.push(participant);
    trip.particpantBalanceSheet.set(participant, new Balance());
    console.log(`Participant ${participantName} created`);
  }

  addExpense(expenseRequest: IExpenseRequest) {
    const expenseStrategy = this.expenseStrategyFactory.getExpenseStrategy(
      expenseRequest.splitType
    );
    if (!expenseStrategy) {
      console.log(
        `No expense strategy exists associated with provided split type ${expenseRequest.splitType}`
      );
      return;
    }
    const expense = expenseStrategy.createExpense(expenseRequest);
    if (expense) {
      expenseRequest.trip.expenses.push(expense);
    }
  }

  printSummary(trip: Trip) {
    const totalExpenseMade = trip.expenses.reduce(
      (totalExpenseMade, expense) => {
        return totalExpenseMade + expense.totalAmount;
      },
      0
    );
    console.log(`Total expense made : ${totalExpenseMade}`);

    for (const [category, expenseAmount] of trip.categoryExpenseMap) {
      console.log(`${category.name} : ${expenseAmount}`);
    }
    for (const [participant, balance] of trip.particpantBalanceSheet) {
      console.log(
        `${participant.name} owes ${balance.owes} and is owed ${balance.owed}`
      );
    }
  }

  calculateTransitivePayment(trip: Trip) {
    const borrowerBalanceMap = new Map<User, number>();
    const lenderBalanceMap = new Map<User, number>();
    for (const [participant, balance] of trip.particpantBalanceSheet) {
      const finalBalance = balance.owed - balance.owes;
      if (finalBalance < 0) {
        borrowerBalanceMap.set(participant, Math.abs(finalBalance));
      } else if (finalBalance > 0) {
        lenderBalanceMap.set(participant, finalBalance);
      }
    }
    for (let [borrower, payableAmount] of borrowerBalanceMap) {
      if (payableAmount === 0) {
        continue;
      }
      for (let [lender, lendedAmount] of lenderBalanceMap) {
        if (lendedAmount === 0) {
          continue;
        }
        let payment = lendedAmount;
        if (payableAmount < lendedAmount) {
          payment = payableAmount;
        }
        lenderBalanceMap.set(lender, lendedAmount - payment);
        console.log(`${borrower.name} owes ${lender.name} ${payment} INR`);
        payableAmount -= payment;
      }
    }
  }
}
