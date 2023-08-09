import { DatabaseSource } from "@ridetracker/authservice";

export async function getBikeModel(databaseSource: DatabaseSource, bikeId: string): Promise<string> {
    return await databaseSource.prepare("SELECT model FROM bikes WHERE id = ?", bikeId).first<string>("model");
};
