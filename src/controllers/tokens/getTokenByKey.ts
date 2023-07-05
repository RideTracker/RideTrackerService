import { Token } from "../../models/token";

export async function getTokenByKey(database: D1Database, key: string): Promise<Token> {
    return await database.prepare("SELECT tokens.*, users.email FROM tokens LEFT JOIN users ON users.id = tokens.user WHERE tokens.key = ?").bind(key).first();
};
