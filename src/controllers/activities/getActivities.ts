import { Activity } from "../../models/activity";

export async function getActivities(database: D1Database): Promise<Activity[] | null> {
    return (await database.prepare("SELECT * FROM activities").all<Activity>()).results ?? null;
};
