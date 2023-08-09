import { DatabaseSource } from "@ridetracker/authservice";

export async function deleteActivitySummaries(databaseSource: DatabaseSource, activityId: string): Promise<void> {
    await databaseSource.prepare("DELETE FROM activity_summary WHERE id = ?", activityId).run();
};
