import { Bike } from "../../models/bike";
import { getBikeById } from "./getBikeById";

export async function createBike(database: D1Database, user: string, name: string, model: string): Promise<Bike> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO bikes (id, user, name, model, timestamp) VALUES (?, ?, ?, ?, ?)").bind(id, user, name, model, timestamp).run();

    return await getBikeById(database, id);
};
