"use strict";
/*
Assuming name for trip and category/participant with a trip to be unique
Assuming each trip can have multiple categories and each category can have multiple expenses
Scroll up in console to see results blocked by option selection
Run yarn start to start the expense mangager
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expenseStrategyFactory_1 = __importDefault(require("./factories/expenseStrategyFactory"));
const expenseManager_1 = __importDefault(require("./services/expenseManager"));
const tripService_1 = __importDefault(require("./services/tripService"));
const userService_1 = __importDefault(require("./services/userService"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const percentSplit_1 = require("./models/percentSplit");
const prompt = (0, prompt_sync_1.default)();
const expenseManager = new expenseManager_1.default(new userService_1.default(), new tripService_1.default(), new expenseStrategyFactory_1.default());
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
                    console.log(`No category found with name ${categoryName} in trip ${tripName}, please add a category first`);
                    break;
                }
                const expenseMadeBy = prompt("Expense made by : ");
                const madeBy = trip.participants.find((p) => p.name === expenseMadeBy);
                if (!madeBy) {
                    console.log(`No participant found with name ${expenseMadeBy} in trip ${tripName}, please add a participant first`);
                    break;
                }
                const amountText = prompt("Enter amount : ");
                if (isNaN(parseFloat(amountText))) {
                    console.log(`Invalid amount received`);
                    break;
                }
                const expenseRequest = {
                    trip,
                    category,
                    madeBy,
                    amount: parseFloat(amountText),
                    splitType: 0 /* Equal */,
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
                    console.log(`No category found with name ${categoryName} in trip ${tripName}, please add a category first`);
                    break;
                }
                const expenseMadeBy = prompt("Expense made by : ");
                const madeBy = trip.participants.find((p) => p.name === expenseMadeBy);
                if (!madeBy) {
                    console.log(`No participant found with name ${expenseMadeBy} in trip ${tripName}, please add a participant first`);
                    break;
                }
                const amountText = prompt("Enter amount : ");
                if (isNaN(parseFloat(amountText))) {
                    console.log(`Invalid amount received`);
                    break;
                }
                const amount = parseFloat(amountText);
                const splits = [];
                for (let participant of trip.participants) {
                    const percentShareText = prompt(`${participant.name}'s Percentage of share : `);
                    if (isNaN(parseFloat(percentShareText))) {
                        console.log(`Invalid percent received`);
                        break;
                    }
                    const percentShare = parseFloat(percentShareText);
                    const amountShare = amount * (percentShare / 100);
                    splits.push(new percentSplit_1.PercentSplit(participant, amountShare, percentShare));
                }
                const expenseRequest = {
                    trip,
                    category,
                    madeBy,
                    amount: parseFloat(amountText),
                    splitType: 1 /* Percent */,
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
//# sourceMappingURL=index.js.map