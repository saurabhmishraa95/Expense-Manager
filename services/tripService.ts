import Trip from "../models/trip";

export default class TripService {
  trips: Trip[] = [];

  addTripByName(tripName: string): Trip {
    const trip = new Trip(tripName);
    this.trips.push(trip);
    return trip;
  }

  getTripByName(tripName: string): Trip | undefined {
    return this.trips.find((trip) => trip.name === tripName);
  }
}
