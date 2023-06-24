import { Activity } from "../../models/activity";

export async function getActivitiesWithoutSummary(database: D1Database): Promise<Activity[]> {
    return (await database.prepare("SELECT activities.* FROM activities WHERE (SELECT COUNT(id) FROM activity_summary WHERE activity_summary.id = activities.id) = 0 ORDER BY activities.timestamp ASC").all<Activity>()).results ?? [];
};
