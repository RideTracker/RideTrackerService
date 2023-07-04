import { Activity } from "../../models/activity";

export async function updateActivityStatus(database: D1Database, id: string, status: string): Promise<void> {
    await database.prepare("UPDATE activities SET status = ? WHERE id = ?").bind(status, id).run();
};
