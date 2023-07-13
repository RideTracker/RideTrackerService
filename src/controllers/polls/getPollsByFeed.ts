import { Poll } from "../../models/Poll";

export async function getPollsByFeed(database: D1Database, offset: number, limit: number): Promise<Poll[]> {
    return (await database.prepare("SELECT id, timestamp FROM polls ORDER BY timestamp DESC LIMIT ?1 OFFSET ?2").bind(limit, offset).all<Poll>()).results ?? [];
};
