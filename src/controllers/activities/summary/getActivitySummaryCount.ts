import { Activity } from "@ridetracker/ridetrackertypes";
import { ActivitySummary } from "@ridetracker/ridetrackertypes";

export async function getActivitySummaryCount(database: D1Database, id: string): Promise<number> {
    return await database.prepare("SELECT COUNT(id) AS count FROM activity_summary WHERE id = ?").bind(id).first<number>("count");
};
