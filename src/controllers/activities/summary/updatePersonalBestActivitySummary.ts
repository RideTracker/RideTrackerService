import { ActivitySummary } from "../../../models/activitySummary";
import { getActivitySummaryById } from "./getActivitySummaryById";

function updatePersonalBestActivitySummaryColumn(database: D1Database, user: string, column: string) {
    return [
        database.prepare("UPDATE activity_summary SET personal_best = 0 WHERE key = ?2 AND activity_summary.id = (SELECT activities.id FROM activities JOIN activity_summary ON activities.id = activity_summary.id WHERE user = ?1)").bind(user, column),
        database.prepare("UPDATE activity_summary SET personal_best = 1 WHERE key = ?2 AND activity_summary.id = (SELECT activities.id FROM activities JOIN activity_summary ON activities.id = activity_summary.id WHERE activities.user = ?1 ORDER BY value DESC LIMIT 1)").bind(user, column)
    ];
};

export async function updatePersonalBestActivitySummary(database: D1Database, user: string): Promise<void> {
    await database.batch([
        ...updatePersonalBestActivitySummaryColumn(database, user, "distance"),
        ...updatePersonalBestActivitySummaryColumn(database, user, "max_speed"),
        ...updatePersonalBestActivitySummaryColumn(database, user, "average_speed"),
        ...updatePersonalBestActivitySummaryColumn(database, user, "elevation")
    ]);
};
