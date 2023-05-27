export async function getActivityCommentsCount(database: D1Database, activity: string): Promise<number> {
    return await database.prepare("SELECT COUNT(*) AS count FROM activity_comments WHERE activity = ?").bind(activity).first<number>("count");
};
