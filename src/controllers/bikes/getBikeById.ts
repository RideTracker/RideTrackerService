import { Bike } from "../../models/bike";

export async function getBikeById(database: D1Database, id: string): Promise<Bike> {
    return await database.prepare("SELECT * FROM bikes WHERE id = ?").bind(id).first();
};
