import { Activity } from "../../../models/activity";
import { ActivityComment } from "../../../models/activityComment";
import { ActivitySummary } from "../../../models/activitySummary";

export async function getLatestActivityCommand(database: D1Database, activity: string): Promise<ActivityComment | null> {
    return await database.prepare("SELECT * FROM activity_comments WHERE activity = ? ORDER BY timestamp DESC LIMIT 1").bind(activity).first();
};
