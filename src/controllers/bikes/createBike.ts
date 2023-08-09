import { DatabaseSource } from "@ridetracker/authservice";
import { Bike } from "../../models/bike";
import { getBikeById } from "./getBikeById";

export async function createBike(databaseSource: DatabaseSource, user: string, name: string, model: string): Promise<Bike> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await databaseSource.prepare("INSERT INTO bikes (id, user, name, model, timestamp) VALUES (?, ?, ?, ?, ?) RETURNING *", id, user, name, model, timestamp).first<Bike>();
};
