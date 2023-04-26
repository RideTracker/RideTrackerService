import { Activity } from "../../../models/activity";
import { ActivitySummary } from "../../../models/activitySummary";

export async function getActivitySummaryById(database: D1Database, id: string): Promise<ActivitySummary | null> {
    return await database.prepare("SELECT start_area as startArea, finish_area as finishArea, max_speed as maxSpeed, average_speed as averageSpeed, distance_personal_best as distancePersonalBest, elevation_personal_best as elevationPersonalBest, max_speed_personal_best as maxSpeedPersonalBest, average_speed_personal_best as averageSpeedPersonalBest, activity_summary.* FROM activity_summary WHERE id = ?").bind(id).first();
};
