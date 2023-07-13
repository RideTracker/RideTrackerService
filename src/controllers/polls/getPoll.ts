import { Poll } from "../../models/Poll";

export async function getPoll(database: D1Database, id: string): Promise<Poll | null> {
    return await database.prepare("SELECT * FROM polls WHERE id = ?").bind(id).first<Poll | null>();
};
