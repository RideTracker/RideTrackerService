import { Activity } from "../../models/activity";

export async function getActivitiesByUser(database: D1Database, user: string, offset: number = 0): Promise<Activity[]> {
    return (await database.prepare("SELECT * FROM activities WHERE user = ? ORDER BY timestamp DESC LIMIT 10 OFFSET ?").bind(user, offset).all<Activity>()).results ?? [];
};
