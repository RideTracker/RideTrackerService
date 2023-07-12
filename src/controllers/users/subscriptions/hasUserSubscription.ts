export async function hasUserSubscription(database: D1Database, user: string): Promise<number> {
    return await database.prepare("SELECT COUNT(id) AS count FROM user_subscriptions WHERE user = ? AND expires > ?").bind(user, Date.now()).first<number>("count");
};
