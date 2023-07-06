export async function createMessage(database: D1Database, user: string, message: string): Promise<void> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO messages (id, user, message, timestamp) VALUES (?, ?, ?, ?)").bind(id, user, message, timestamp).run();
};
