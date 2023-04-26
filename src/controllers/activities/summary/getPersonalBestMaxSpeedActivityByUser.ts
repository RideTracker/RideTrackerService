import { ActivitySummary } from "../../../models/activitySummary";
import { getActivitySummaryById } from "./getActivitySummaryById";

export async function getPersonalBestMaxSpeedActivityByUser(database: D1Database, user: string): Promise<ActivitySummary | null> {
    const id = await database.prepare("SELECT activity_summmary.id FROM activity_summary INNER JOIN users ON users.id = ? WHERE activity_summary.max_speed_personal_best = TRUE ORDER BY activity_summary.timestamp DESC").bind(user).first<string>("activity_summary.id");

    return await getActivitySummaryById(database, id);
};
