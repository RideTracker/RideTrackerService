import DatabaseSource from "../../../database/databaseSource";
import { UserSubscription } from "../../../models/UserSubscription";

export async function getUserSubscriptionByToken(databaseSource: DatabaseSource, token: string): Promise<UserSubscription | null> {
    return await databaseSource.prepare("SELECT * FROM user_subscriptions WHERE token = ?", token).first();
};
