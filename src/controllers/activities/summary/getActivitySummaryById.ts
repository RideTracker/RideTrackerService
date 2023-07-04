import { Activity } from "../../../models/activity";
import { ActivitySummary } from "../../../models/activitySummary";

export async function getActivitySummaryById(database: D1Database, id: string): Promise<ActivitySummary[]> {
    return (await database.prepare("SELECT * FROM activity_summary WHERE id = ?").bind(id).all<ActivitySummary>()).results ?? [];
};
