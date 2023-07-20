import { TokenType } from "../../models/TokenType";
import { Token } from "../../models/token";

export async function createToken(database: D1Database, key: string, type: TokenType, user?: string): Promise<Token | null> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await database.prepare("INSERT INTO tokens (id, key, type, user, timestamp) VALUES (?, ?, ?, ?, ?) RETURNING *").bind(id, key, type, user, timestamp).first<Token | null>();
};
