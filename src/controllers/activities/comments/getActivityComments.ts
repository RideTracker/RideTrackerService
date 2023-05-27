import { Activity } from "../../../models/activity";
import { ActivityComment } from "../../../models/activityComment";
import { ActivitySummary } from "../../../models/activitySummary";

export async function getActivityComments(database: D1Database, activity: string): Promise<ActivityComment[]> {
    return (await database.prepare("SELECT * FROM activity_comments WHERE activity = ? ORDER BY timestamp DESC").bind(activity).all<ActivityComment>()).results ?? [];
};
