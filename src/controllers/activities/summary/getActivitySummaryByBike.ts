import { ActivitySummary } from "../../../models/activitySummary";

export async function getActivitySummaryByBike(database: D1Database, bikeId: string): Promise<ActivitySummary[]> {
    return (await database.prepare("SELECT key, value FROM (SELECT activity_summary.key AS key, SUM(activity_summary.value) AS value FROM activity_summary INNER JOIN activities ON activities.bike = ?1 WHERE activity_summary.id = activities.id GROUP BY activity_summary.key UNION ALL SELECT 'activities' AS key, COUNT(id) AS value FROM activities WHERE bike = ?1)").bind(bikeId).all<ActivitySummary>()).results ?? [];
};
