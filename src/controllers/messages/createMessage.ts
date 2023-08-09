import DatabaseSource from "../../database/databaseSource";

export async function createMessage(databaseSource: DatabaseSource, user: string, message: string): Promise<void> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await databaseSource.prepare("INSERT INTO messages (id, user, message, timestamp) VALUES (?, ?, ?, ?)", id, user, message, timestamp).run();
};
