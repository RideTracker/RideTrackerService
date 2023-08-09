import { DatabaseSource } from "@ridetracker/authservice";

function updatePersonalBestActivitySummaryColumn(databaseSource: DatabaseSource, user: string, column: string) {
    return [
        databaseSource.prepare("UPDATE activity_summary SET personal_best = 0 WHERE key = ?2 AND activity_summary.id = (SELECT activities.id FROM activities JOIN activity_summary ON activities.id = activity_summary.id WHERE user = ?1)", user, column),
        databaseSource.prepare("UPDATE activity_summary SET personal_best = 1 WHERE key = ?2 AND activity_summary.id = (SELECT activities.id FROM activities JOIN activity_summary ON activities.id = activity_summary.id WHERE activities.user = ?1 ORDER BY value DESC LIMIT 1)", user, column)
    ];
};

export async function updatePersonalBestActivitySummary(databaseSource: DatabaseSource, user: string): Promise<void> {
    await databaseSource.batch([
        ...updatePersonalBestActivitySummaryColumn(databaseSource, user, "distance"),
        ...updatePersonalBestActivitySummaryColumn(databaseSource, user, "max_speed"),
        ...updatePersonalBestActivitySummaryColumn(databaseSource, user, "average_speed"),
        ...updatePersonalBestActivitySummaryColumn(databaseSource, user, "elevation")
    ]);
};
