export async function getActivityCountByUser(database: D1Database, user: string): Promise<number> {
    return await database.prepare("SELECT COUNT(*) AS count FROM activities WHERE user = ?").bind(user).first("count");
};
