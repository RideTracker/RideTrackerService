import DatabaseSource from "../../../database/databaseSource";

export async function hasUserSubscription(databaseSource: DatabaseSource, user: string): Promise<number> {
    return await databaseSource.prepare("SELECT COUNT(id) AS count FROM user_subscriptions WHERE user = ? AND expires > ?", user, Date.now()).first<number>("count");
};
