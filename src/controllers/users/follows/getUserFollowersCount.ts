export async function getUserFollowersCount(database: D1Database, user: string): Promise<number> {
    return await database.prepare("SELECT COUNT(*) AS count FROM user_follows WHERE follow = ?").bind(user).first("count");
};
