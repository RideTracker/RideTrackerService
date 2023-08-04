import { Activity } from "@ridetracker/ridetrackertypes";
import { ActivitySummary } from "@ridetracker/ridetrackertypes";

export async function getActivitySummaryById(database: D1Database, id: string): Promise<ActivitySummary[]> {
    return (await database.prepare("SELECT personal_best AS personalBest, activity_summary.* FROM activity_summary WHERE id = ?").bind(id).all<ActivitySummary>()).results ?? [];
};
