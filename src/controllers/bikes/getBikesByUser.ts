import { DatabaseSource } from "@ridetracker/authservice";
import { Bike } from "../../models/bike";

export async function getBikesByUser(databaseSource: DatabaseSource, user: string): Promise<Bike[]> {
    return await databaseSource.prepare("SELECT * FROM bikes WHERE user = ?", user).all<Bike>();
};
