export async function deleteActivitySummaries(database: D1Database, activityId: string): Promise<void> {
    await database.prepare("DELETE FROM activity_summary WHERE id = ?").bind(activityId).run();
};
