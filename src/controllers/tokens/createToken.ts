import { Token } from "../../models/token";
import { getTokenById } from "./getTokenById";

export async function createToken(database: D1Database, key: string, user?: string): Promise<Token> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO tokens (id, key, user, timestamp) VALUES (?, ?, ?, ?)").bind(id, key, user, timestamp).run();
    
    return await getTokenById(database, id);
};
