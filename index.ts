/*
Assuming name for trip and category/participant with a trip to be unique
Assuming each trip can have multiple categories and each category can have multiple expenses
Scroll up in console to see results blocked by option selection
Run yarn install and yarn start to start the expense manager
*/

import ExpenseStrategyFactory from "./factories/expenseStrategyFactory";
import { SplitType } from "./models/splitType";
import ExpenseManager from "./services/expenseManager";
import TripService from "./services/tripService";
import UserService from "./services/userService";
import PromptSync from "prompt-sync";
import IExpenseRequest from "./contracts/expenseRequest";
import { PercentSplit } from "./models/percentSplit";
const prompt = PromptSync();

const expenseManager = new ExpenseManager(
  new UserService(),
  new TripService(),
  new ExpenseStrategyFactory()
);

let keepRunning = true;
while (keepRunning) {
  console.log(`Select options: (Press any other key to exit)\n
    1. Create Trip \n 
    2. Create Participants \n 
    3. Create Category \n 
    4. Note down expense \n
    5. Note unequal expense \n
    6. Show summary \n
    7. Calculate transitive payment \n`);

  const option = prompt("");
  console.log(`Input: ${option}`);

  switch (option) {
    case "1":
      {
        const tripName = prompt("Enter trip name : ");
        expenseManager.createTrip(tripName);
      }
      break;
    case "2":
      {
        const tripName = prompt("Enter trip name : ");
        const trip = expenseManager.fetchTrip(tripName);
        if (!trip) {
          break;
        }
        const participantName = prompt("Enter participant name : ");
        expenseManager.addParticipant(trip, participantName);
      }
      break;
    case "3":
      {
        const tripName = prompt("Enter trip name : ");
        const trip = expenseManager.fetchTrip(tripName);
        if (!trip) {
          break;
        }
        const categoryName = prompt("Enter category name : ");
        expenseManager.addCategory(trip, categoryName);
      }
      break;
    case "4":
      {
        const tripName = prompt("Enter trip name : ");
        const trip = expenseManager.fetchTrip(tripName);
        if (!trip) {
          break;
        }
        const categoryName = prompt("Enter category name : ");
        const category = trip.categories.find((c) => c.name === categoryName);
        if (!category) {
          console.log(
            `No category found with name ${categoryName} in trip ${tripName}, please add a category first`
          );
          break;
        }
        const expenseMadeBy = prompt("Expense made by : ");
        const madeBy = trip.participants.find((p) => p.name === expenseMadeBy);
        if (!madeBy) {
          console.log(
            `No participant found with name ${expenseMadeBy} in trip ${tripName}, please add a participant first`
          );
          break;
        }
        const amountText = prompt("Enter amount : ");

        if (isNaN(parseFloat(amountText))) {
          console.log(`Invalid amount received`);
          break;
        }
        const expenseRequest: IExpenseRequest = {
          trip,
          category,
          madeBy,
          amount: parseFloat(amountText),
          splitType: SplitType.Equal,
          splits: [],
        };
        expenseManager.addExpense(expenseRequest);
      }
      break;
    case "5":
      {
        const tripName = prompt("Enter trip name : ");
        const trip = expenseManager.fetchTrip(tripName);
        if (!trip) {
          break;
        }
        const categoryName = prompt("Enter category name : ");
        const category = trip.categories.find((c) => c.name === categoryName);
        if (!category) {
          console.log(
            `No category found with name ${categoryName} in trip ${tripName}, please add a category first`
          );
          break;
        }
        const expenseMadeBy = prompt("Expense made by : ");
        const madeBy = trip.participants.find((p) => p.name === expenseMadeBy);
        if (!madeBy) {
          console.log(
            `No participant found with name ${expenseMadeBy} in trip ${tripName}, please add a participant first`
          );
          break;
        }
        const amountText = prompt("Enter amount : ");
        if (isNaN(parseFloat(amountText))) {
          console.log(`Invalid amount received`);
          break;
        }
        const amount = parseFloat(amountText);
        const splits: PercentSplit[] = [];
        for (let participant of trip.participants) {
          const percentShareText = prompt(
            `${participant.name}'s Percentage of share : `
          );
          if (isNaN(parseFloat(percentShareText))) {
            console.log(`Invalid percent received`);
            break;
          }
          const percentShare = parseFloat(percentShareText);
          const amountShare = amount * (percentShare / 100);
          splits.push(new PercentSplit(participant, amountShare, percentShare));
        }
        const expenseRequest: IExpenseRequest = {
          trip,
          category,
          madeBy,
          amount: parseFloat(amountText),
          splitType: SplitType.Percent,
          splits,
        };
        expenseManager.addExpense(expenseRequest);
      }
      break;
    case "6":
      {
        const tripName = prompt("Enter trip name : ");
        const trip = expenseManager.fetchTrip(tripName);
        if (!trip) {
          break;
        }
        expenseManager.printSummary(trip);
      }
      break;
    case "7":
      {
        const tripName = prompt("Enter trip name : ");
        const trip = expenseManager.fetchTrip(tripName);
        if (!trip) {
          break;
        }
        expenseManager.calculateTransitivePayment(trip);
      }
      break;
    default:
      keepRunning = false;
      break;
  }
}
