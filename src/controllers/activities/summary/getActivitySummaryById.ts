import { Activity } from "../../../models/activity";
import { ActivitySummary } from "../../../models/activitySummary";

export async function getActivitySummaryById(database: D1Database, id: string): Promise<ActivitySummary | null> {
    return await database.prepare("SELECT max_speed as maxSpeed, average_speed as averageSpeed, activity_summary.* FROM activity_summary WHERE id = ?").bind(id).first();
};
