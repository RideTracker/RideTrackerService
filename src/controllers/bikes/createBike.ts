import { Bike } from "../../models/bike";
import { getBikeById } from "./getBikeById";

export async function createBike(database: D1Database, user: string, name: string): Promise<Bike | null> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO bikes (id, user, name, timestamp) VALUES (?, ?, ?, ?)").bind(id, user, name, timestamp).run();

    return await getBikeById(database, id);
};
