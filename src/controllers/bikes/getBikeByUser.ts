import { Bike } from "../../models/bike";

export async function getBikesByUser(database: D1Database, user: string): Promise<Bike[] | null> {
    return (await database.prepare("SELECT * FROM bikes WHERE user = ?").bind(user).all<Bike>()).results ?? null;
};
