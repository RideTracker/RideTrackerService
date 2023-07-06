import { ActivitySummary } from "../../../models/activitySummary";

export async function getActivitySummaryByBike(database: D1Database, bikeId: string): Promise<ActivitySummary[]> {
    return await database.prepare("SELECT activity_summary.key, SUM(activity_summary.value) FROM activity_summary INNER JOIN activities ON activities.bike = ? WHERE activity_summary.id = activities.id GROUP BY activity_summary.key").bind(bikeId).first();
};
