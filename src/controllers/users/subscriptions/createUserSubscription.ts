import DatabaseSource from "../../../database/databaseSource";

export async function createUserSubscription(databaseSource: DatabaseSource, user: string, token: string, product: string, expires: number): Promise<void> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await databaseSource.prepare("INSERT INTO user_subscriptions (id, user, token, product, expires, timestamp) VALUES (?, ?, ?, ?, ?, ?)", id, user, token, product, expires, timestamp).run();
};
