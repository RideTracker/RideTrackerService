import DatabaseSource from "../../../database/databaseSource";

export async function deleteActivitySummaries(databaseSource: DatabaseSource, activityId: string): Promise<void> {
    await databaseSource.prepare("DELETE FROM activity_summary WHERE id = ?", activityId).run();
};
