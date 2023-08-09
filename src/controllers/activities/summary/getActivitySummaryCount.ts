import { DatabaseSource } from "@ridetracker/authservice";

export async function getActivitySummaryCount(databaseSource: DatabaseSource, id: string): Promise<number> {
    return await databaseSource.prepare("SELECT COUNT(id) AS count FROM activity_summary WHERE id = ?", id).first<number>("count");
};
