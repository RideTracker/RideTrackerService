import { ActivitySummary } from "@ridetracker/ridetrackertypes";
import { DatabaseSource } from "@ridetracker/authservice";

export async function getActivitySummaryByBike(databaseSource: DatabaseSource, bikeId: string): Promise<ActivitySummary[]> {
    return await databaseSource.prepare("SELECT key, value FROM (SELECT 'activities' AS key, COUNT(id) AS value FROM activities WHERE bike = ?1 UNION ALL SELECT activity_summary.key AS key, SUM(activity_summary.value) AS value FROM activity_summary INNER JOIN activities ON activities.bike = ?1 WHERE activity_summary.id = activities.id GROUP BY activity_summary.key)", bikeId).all<ActivitySummary>();
};
