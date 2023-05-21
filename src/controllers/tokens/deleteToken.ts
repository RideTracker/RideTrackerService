export async function deleteToken(database: D1Database, id: string): Promise<void> {
    await database.prepare("DELETE FROM tokens WHERE id = ?").bind(id).run();
};
