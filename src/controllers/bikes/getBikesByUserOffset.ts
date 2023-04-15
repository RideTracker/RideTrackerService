import { Bike } from "../../models/bike";

export async function getBikesByUserOffset(database: D1Database, user: string, offset: number): Promise<Bike[] | null> {
    return (await database.prepare("SELECT * FROM bikes WHERE user = ? ORDER BY timestamp DESC LIMIT 10 OFFSET ?").bind(user, offset).all<Bike>()).results ?? null;
};
