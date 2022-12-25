"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trip_1 = __importDefault(require("../models/trip"));
class TripService {
    constructor() {
        this.trips = [];
    }
    addTripByName(tripName) {
        const trip = new trip_1.default(tripName);
        this.trips.push(trip);
        return trip;
    }
    getTripByName(tripName) {
        return this.trips.find((trip) => trip.name === tripName);
    }
}
exports.default = TripService;
//# sourceMappingURL=tripService.js.map