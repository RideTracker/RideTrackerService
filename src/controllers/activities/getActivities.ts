import { Activity } from "../../models/activity";

export async function getActivities(database: D1Database): Promise<Activity[]> {
    return (await database.prepare("SELECT * FROM activities ORDER BY timestamp DESC").all<Activity>()).results ?? [];
};
