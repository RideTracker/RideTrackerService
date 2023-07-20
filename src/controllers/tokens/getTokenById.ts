import { Token } from "@ridetracker/authservice";

export async function getTokenById(database: D1Database, id: string): Promise<Token> {
    return await database.prepare("SELECT * FROM tokens WHERE id = ?").bind(id).first();
};
