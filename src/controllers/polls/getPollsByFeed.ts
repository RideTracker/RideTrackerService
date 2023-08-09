import DatabaseSource from "../../database/databaseSource";
import { Poll } from "../../models/Poll";

export async function getPollsByFeed(databaseSource: DatabaseSource, offset: number, limit: number): Promise<Poll[]> {
    return await databaseSource.prepare("SELECT id, timestamp FROM polls ORDER BY timestamp DESC LIMIT ?1 OFFSET ?2", limit, offset).all<Poll>();
};
