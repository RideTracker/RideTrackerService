export async function createUserSubscription(database: D1Database, user: string, token: string, product: string, expires: number): Promise<void> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO user_subscriptions (id, user, token, product, expires, timestamp) VALUES (?, ?, ?, ?, ?, ?)").bind(id, user, token, product, expires, timestamp).run();
};
