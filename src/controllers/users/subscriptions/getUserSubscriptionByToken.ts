import { UserSubscription } from "../../../models/UserSubscription";

export async function getUserSubscriptionByToken(database: D1Database, token: string): Promise<UserSubscription | null> {
    return await database.prepare("SELECT * FROM user_subscriptions WHERE token = ?").bind(token).first();
};
