import { Token } from "../../models/token";

export async function getTokenByKey(database: D1Database, key: string): Promise<Token> {
    return await database.prepare("SELECT * FROM tokens WHERE key = ?").bind(key).first();
};
