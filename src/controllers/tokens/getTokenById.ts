import { Token } from "../../models/token";

export async function getTokenById(database: D1Database, id: string): Promise<Token | null> {
    return await database.prepare("SELECT * FROM tokens WHERE id = ?").bind(id).first();
};
