import { ActivitySummary } from "../../../models/activitySummary";
import { getActivitySummaryById } from "./getActivitySummaryById";

function updatePersonalBestActivitySummaryColumn(database: D1Database, user: string, column: string) {
    return database.prepare(
        "UPDATE activity_summary SET " + column + "_personal_best = NULL WHERE " + column + "_personal_best IS NULL AND activity_summary.id = (SELECT activities.id FROM activities JOIN activity_summary ON activities.id = activity_summary.id WHERE user = ?1); " +
        "UPDATE activity_summary SET " + column + "_personal_best = 1 WHERE activity_summary.id = (SELECT activities.id FROM activities JOIN activity_summary ON activities.id = activity_summary.id WHERE activities.user = ?1 ORDER BY activity_summary." + column + " DESC LIMIT 1)"
    ).bind(user).first<string>("activity_summary.id");
};

export async function updatePersonalBestActivitySummary(database: D1Database, user: string): Promise<void> {
    await Promise.all([
        updatePersonalBestActivitySummaryColumn(database, user, "distance"),
        updatePersonalBestActivitySummaryColumn(database, user, "max_speed"),
        updatePersonalBestActivitySummaryColumn(database, user, "average_speed"),
        updatePersonalBestActivitySummaryColumn(database, user, "elevation")
    ]);
};
